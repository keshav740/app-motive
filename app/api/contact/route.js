import { NextResponse } from 'next/server';
import { getMongoClient, saveLocalLead } from '../../../lib/db';
import {
  validatePhone,
  validateEmail,
  isBotOrHoneypot,
  checkSpamKeywords,
  checkRateLimit,
} from '../../../lib/leadValidator';

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Bot Honeypot & Speed Detection (Shadow Drop - Bot thinks it succeeded, but lead is never saved)
    const botCheck = isBotOrHoneypot(body);
    if (botCheck.isBot) {
      console.warn(`[AntiSpam] Bot submission intercepted & dropped: ${botCheck.reason}`);
      return NextResponse.json(
        {
          success: true,
          message: 'Inquiry received successfully.',
          shadowDropped: true,
        },
        { status: 200 }
      );
    }

    // 2. IP Rate Limiting (Protects from automated spam scripts)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: rateLimit.error },
        { status: 429 }
      );
    }

    const {
      name,
      email,
      phone,
      message,
      service,
      serviceCategory,
      appPlatform,
      adBudget,
      chainTarget,
      aiUseCase,
      appType,
      storePlatform,
      devOpsNeed,
      cloudNeed,
    } = body;

    // 3. Basic Presence Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400 }
      );
    }

    // 4. Strict Phone Number Validation (Rejects dummy/repeated numbers like 1234567890, 0000000000)
    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) {
      return NextResponse.json(
        { success: false, error: phoneCheck.error },
        { status: 400 }
      );
    }

    // 5. Strict Email Validation (Rejects disposable/burner email services)
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return NextResponse.json(
        { success: false, error: emailCheck.error },
        { status: 400 }
      );
    }

    // 6. Spam Keywords Filter (SEO bots, crypto recovery, casino link injections)
    const combinedContent = `${name} ${message || ''}`;
    const isSpam = checkSpamKeywords(combinedContent);
    if (isSpam) {
      console.warn(`[AntiSpam] Lead dropped due to detected spam keywords.`);
      return NextResponse.json(
        {
          success: true,
          message: 'Inquiry received successfully.',
          shadowDropped: true,
        },
        { status: 200 }
      );
    }

    const leadData = {
      name: name.trim(),
      email: emailCheck.cleanEmail,
      phone: phone.trim(),
      message: message ? message.trim() : '',
      service: service || serviceCategory || 'General Inquiry',
      details: {
        appPlatform,
        adBudget,
        chainTarget,
        aiUseCase,
        appType,
        storePlatform,
        devOpsNeed,
        cloudNeed,
      },
      status: 'New',
      verifiedQuality: true,
      ip: ip !== 'unknown' ? ip : undefined,
      createdAt: new Date(),
    };

    try {
      const { client } = await getMongoClient();
      const db = client.db('appmotive');
      const collection = db.collection('leads');
      const result = await collection.insertOne(leadData);
      await client.close();

      return NextResponse.json(
        {
          success: true,
          message: 'Inquiry received successfully.',
          leadId: result.insertedId,
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.warn('MongoDB saving failed. Storing lead in local fallback file:', dbError.message);
      const savedLead = saveLocalLead(leadData);

      return NextResponse.json(
        {
          success: true,
          message: 'Inquiry received successfully.',
          leadId: savedLead._id,
          storedLocally: true,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Failed to process contact form submission:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error while submitting inquiry.' },
      { status: 500 }
    );
  }
}
