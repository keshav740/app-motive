// Lead Quality, Anti-Bot & Anti-Spam Validator
// Prevents junk leads, bots, fake numbers, and disposable emails from polluting Google Ads and CRM

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'guerrillamailblock.com',
  '10minutemail.com',
  '10minutemail.net',
  'yopmail.com',
  'trashmail.com',
  'sharklasers.com',
  'dispostable.com',
  'getairmail.com',
  'burnermail.io',
  'throwawaymail.com',
  'fakemailgenerator.com',
  'emailondeck.com',
  'mohmal.com',
  'mytemp.email',
  'tempail.com',
  'crazymailing.com',
  'generator.email',
  'armyspy.com',
  'cuvox.de',
  'dayrep.com',
  'fleckens.hu',
  'gustr.com',
  'jourrapide.com',
  'rhyta.com',
  'superrito.com',
  'teleworm.us',
  'tinify.info',
]);

const DUMMY_PHONE_PATTERNS = new Set([
  '1234567890',
  '0123456789',
  '9876543210',
  '0987654321',
  '1234512345',
  '1122334455',
  '9988776655',
  '1231231234',
  '9999988888',
  '1111122222',
  '0000000000',
  '1111111111',
  '2222222222',
  '3333333333',
  '4444444444',
  '5555555555',
  '6666666666',
  '7777777777',
  '8888888888',
  '9999999999',
]);

const SPAM_KEYWORDS = [
  'crypto recovery',
  'stolen bitcoin',
  'guest post',
  'backlink service',
  'seo ranking guarantee',
  'casino online',
  'free spins',
  'viagra',
  'cialis',
  'porn',
  'sex video',
  't.me/',
  'telegram @',
  'whatsapp me on +',
  'earn $',
  'passive income guarantee',
  'hack account',
];

// In-memory rate limiting map: ip -> array of timestamps
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 4; // max 4 submissions per 10 mins per IP

export function checkRateLimit(ip) {
  if (!ip || ip === 'unknown') return { allowed: true };

  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out expired timestamps
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      error: 'Too many submissions received from your connection. Please wait 10 minutes or message us directly on WhatsApp.',
    };
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 1000) {
    for (const [key, list] of rateLimitMap.entries()) {
      const active = list.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) rateLimitMap.delete(key);
      else rateLimitMap.set(key, active);
    }
  }

  return { allowed: true };
}

export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required.' };
  }

  const digits = phone.replace(/\D/g, '');

  if (digits.length < 10) {
    return { valid: false, error: 'Please enter a valid phone number with at least 10 digits.' };
  }

  if (digits.length > 15) {
    return { valid: false, error: 'Phone number is too long. Please enter a valid phone number.' };
  }

  const last10 = digits.slice(-10);

  // Reject all identical digits (e.g. 0000000000, 9999999999) with or without country code
  if (/^(\d)\1{7,}$/.test(digits) || /^(\d)\1{7,}$/.test(last10)) {
    return { valid: false, error: 'Please enter a real, active contact number.' };
  }

  // Reject starting with 4+ identical zeros
  if (/^0{4,}/.test(digits) || /^0{4,}/.test(last10)) {
    return { valid: false, error: 'Please enter a valid mobile or phone number.' };
  }

  // Reject known sequential dummy numbers (checking full digits or last 10 digits)
  if (DUMMY_PHONE_PATTERNS.has(digits) || DUMMY_PHONE_PATTERNS.has(last10)) {
    return { valid: false, error: 'Please enter a real, active contact number.' };
  }

  return { valid: true, cleanPhone: digits };
}

export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email address is required.' };
  }

  const clean = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(clean)) {
    return { valid: false, error: 'Please provide a valid email format (e.g., name@company.com).' };
  }

  const domain = clean.split('@')[1];
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      valid: false,
      error: 'Temporary or disposable email addresses are not accepted. Please use a work or personal email.',
    };
  }

  return { valid: true, cleanEmail: clean };
}

export function isBotOrHoneypot(body) {
  if (!body || typeof body !== 'object') return false;

  // 1. Check honeypot trap fields (invisible to real humans, filled by bots)
  const honeypotKeys = [
    'hp_website',
    'hp_company_website',
    'website_hp',
    '_gotcha',
    'company_tax_id',
    'fax_number',
  ];

  for (const key of honeypotKeys) {
    if (body[key] && String(body[key]).trim().length > 0) {
      return { isBot: true, reason: `Honeypot field '${key}' was filled` };
    }
  }

  // 2. Check form fill speed (superhuman bot submission in < 800 milliseconds)
  if (body._formLoadedAt) {
    const elapsed = Date.now() - Number(body._formLoadedAt);
    if (!isNaN(elapsed) && elapsed > 0 && elapsed < 800) {
      return { isBot: true, reason: `Form submitted unnaturally fast (${elapsed}ms)` };
    }
  }

  return { isBot: false };
}

export function checkSpamKeywords(text) {
  if (!text || typeof text !== 'string') return false;

  const lower = text.toLowerCase();
  for (const kw of SPAM_KEYWORDS) {
    if (lower.includes(kw)) {
      return true;
    }
  }
  return false;
}
