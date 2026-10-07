import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getMongoClient, getLocalLeads, updateLocalLeadStatus, deleteLocalLead } from '../../../../lib/db';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'appmotive2026';

function isAuthorized(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  return token === ADMIN_PASSWORD;
}

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, token: ADMIN_PASSWORD });
    }
    return NextResponse.json({ success: false, error: 'Invalid admin passcode.' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Authentication error.' }, { status: 500 });
  }
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const localLeads = getLocalLeads();

  try {
    const { client } = await getMongoClient();
    const db = client.db('appmotive');
    const dbLeads = await db
      .collection('leads')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    await client.close();

    const allLeads = [...dbLeads, ...localLeads];
    return NextResponse.json({ success: true, leads: allLeads });
  } catch (error) {
    console.warn('Could not fetch leads from MongoDB, returning local leads:', error.message);
    return NextResponse.json({ success: true, leads: localLeads });
  }
}

export async function PATCH(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { leadId, status } = await request.json();
    if (!leadId || !status) {
      return NextResponse.json({ success: false, error: 'leadId and status required.' }, { status: 400 });
    }

    const updatedLocal = updateLocalLeadStatus(leadId, status);
    if (updatedLocal) {
      return NextResponse.json({ success: true, modifiedCount: 1 });
    }

    try {
      const { client } = await getMongoClient();
      const db = client.db('appmotive');
      const result = await db.collection('leads').updateOne(
        { _id: new ObjectId(leadId) },
        { $set: { status, updatedAt: new Date() } }
      );
      await client.close();
      return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
    } catch (dbErr) {
      return NextResponse.json({ success: false, error: 'Failed to update lead status in database.' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Database update error.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('id');

    if (!leadId) {
      return NextResponse.json({ success: false, error: 'Lead ID required.' }, { status: 400 });
    }

    const deletedLocal = deleteLocalLead(leadId);
    if (deletedLocal) {
      return NextResponse.json({ success: true, deletedCount: 1 });
    }

    try {
      const { client } = await getMongoClient();
      const db = client.db('appmotive');
      const result = await db.collection('leads').deleteOne({ _id: new ObjectId(leadId) });
      await client.close();
      return NextResponse.json({ success: true, deletedCount: result.deletedCount });
    } catch (dbErr) {
      return NextResponse.json({ success: false, error: 'Failed to delete lead from database.' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Database delete error.' }, { status: 500 });
  }
}
