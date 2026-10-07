import { NextResponse } from 'next/server';
import { getMongoClient, saveLocalLead } from '../../../lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, service, serviceCategory, appPlatform, adBudget, chainTarget, aiUseCase, appType, storePlatform, devOpsNeed, cloudNeed } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name, Email address and Contact Number are required.' },
        { status: 400 }
      );
    }

    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
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
        cloudNeed
      },
      status: 'New',
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
