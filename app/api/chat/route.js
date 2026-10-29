import { NextResponse } from 'next/server';
import { getMongoClient, saveLocalLead } from '../../../lib/db';
import { validatePhone, validateEmail, checkSpamKeywords } from '../../../lib/leadValidator';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are MotiveAI, an intelligent, friendly, and senior technical consultant representing AppMotive Technologies (a premier digital product engineering agency).

Your mission is to welcome website visitors, answer questions about AppMotive's services, pricing, timelines, and technology stack, and encourage them to book a free engineering consultation or share their contact information.

AppMotive Key Details:
- Core Capabilities:
  1. Website Development: Modern Next.js, React, Node.js, TypeScript, headless architectures.
  2. Mobile Engineering: React Native, iOS, Android cross-platform & native apps.
  3. Meta Ads (Facebook & Instagram) & Google Ads: High-ROI targeted campaigns and conversion tracking.
  4. High-Converting Landing Pages: Fast, high-conversion funnels for ad traffic.
  5. Cloud Infrastructure & Migration: AWS, GCP, Azure, Kubernetes, Docker, serverless lambdas.
  6. Agile DevOps: CI/CD automation pipelines, GitOps, zero-downtime releases.
  7. AI & Workflow Automation: Custom enterprise AI agents, RAG pipelines, LLM integration, intelligent document processing.
  8. Digital Commerce & Business Applications: E-commerce platforms, ERP/CRM portals, custom dashboards.
- Typical Timelines:
  - Landing pages & marketing sites: 1 to 3 weeks.
  - Custom MVPs & web apps: 4 to 8 weeks.
  - Complex enterprise platforms: 10 to 16 weeks.
- Pricing Model:
  - Transparent fixed milestone-based pricing for defined scopes.
  - Dedicated engineering retainer pods for ongoing iteration. No hidden fees.
- Confidentiality & IP:
  - Clients retain 100% intellectual property (IP) and source code ownership upon completion. Standard NDAs signed prior to kickoff.
- Official Contact Info:
  - Email: info@appmotivetechnologies.com
  - Phone / WhatsApp: +91 9837033948, +91 9953286867
  - Official Website: https://www.appmotivetechnologies.com

Guidelines:
- Tone: Warm, confident, technically knowledgeable, concise (2-4 sentences per response unless asked for deep detail).
- If the visitor mentions their name, email, phone number, or project requirements, warmly acknowledge it and let them know the engineering team will get in touch promptly.
- You can speak in English or natural Hinglish depending on how the user greets you.`;

// Regex helpers to extract lead information
function extractLeadInfo(text) {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i;
  const phoneRegex = /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;

  const emailMatch = text.match(emailRegex);
  const email = emailMatch ? emailMatch[1] : null;

  // Filter phones with at least 8 digits
  let phone = null;
  const phoneMatches = text.match(phoneRegex);
  if (phoneMatches) {
    const valid = phoneMatches.find((p) => p.replace(/\D/g, '').length >= 9);
    if (valid) phone = valid.trim();
  }

  return { email, phone };
}

async function recordLeadIfDetected(userMessage, conversationHistory = []) {
  if (checkSpamKeywords(userMessage)) {
    return false;
  }

  const { email, phone } = extractLeadInfo(userMessage);

  const validPhone = phone && validatePhone(phone).valid ? phone : null;
  const validEmail = email && validateEmail(email).valid ? email : null;

  if (validEmail || validPhone) {
    const leadData = {
      name: 'Website Chatbot Visitor',
      email: validEmail || 'Not provided in chat',
      phone: validPhone || 'Not provided in chat',
      service: 'Inquiry via AI Chatbot',
      message: `Full Chat Context:\n${userMessage}`,
      status: 'New',
      source: 'MotiveAI Chatbot',
      verifiedQuality: true,
      createdAt: new Date().toISOString(),
    };

    try {
      const { client } = await getMongoClient();
      const db = client.db('appmotive');
      await db.collection('leads').insertOne({ ...leadData, createdAt: new Date() });
      await client.close();
      return true;
    } catch {
      saveLocalLead(leadData);
      return true;
    }
  }

  return false;
}

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, error: 'Messages array is required' }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    
    // Check if user dropped contact info
    const leadCaptured = await recordLeadIfDetected(lastUserMessage, messages);

    // Format messages for Google Gemini
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nPlease begin conversation.` }],
      },
      {
        role: 'model',
        parts: [{ text: "Hello! I'm MotiveAI, your engineering consultant from AppMotive Technologies. How can I help you today?" }],
      },
    ];

    messages.forEach((msg) => {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      });
    });

    const apiKey = GEMINI_API_KEY || 'AQ.Ab8RN6KtusOaXRGBmJyyalUGx6e2jD_OOPhL84ExZcRIT2TIYA';

    // Candidate models in order of speed and stability
    const candidateModels = [
      'gemini-flash-lite-latest',
      'gemini-3-flash-preview',
      'gemma-4-26b-a4b-it',
    ];

    let reply = '';
    let success = false;

    for (const model of candidateModels) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents }),
          }
        );

        const data = await geminiRes.json();
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          reply = data.candidates[0].content.parts[0].text;
          success = true;
          break;
        }
      } catch (e) {
        console.warn(`Model ${model} request error:`, e.message);
      }
    }

    if (!success || !reply) {
      reply =
        "Thank you for reaching out to AppMotive Technologies! We specialize in custom web development, mobile applications, cloud engineering, and AI automation. Would you like to share your project idea or schedule a free call with our senior architects at info@appmotivetechnologies.com or +91 9837033948 / +91 9953286867?";
    }

    return NextResponse.json({
      success: true,
      reply,
      leadCaptured,
    });
  } catch (error) {
    console.error('API /api/chat error:', error);
    return NextResponse.json(
      {
        success: false,
        reply:
          "I'm here to help with your project! Feel free to ask about our web development, mobile apps, or cloud engineering services, or drop your email/phone so our engineering team can connect with you directly.",
      },
      { status: 500 }
    );
  }
}
