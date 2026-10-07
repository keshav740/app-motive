import fs from 'fs';
import path from 'path';
import { MongoClient, ObjectId } from 'mongodb';

const FALLBACK_FILE_PATH = path.join(process.cwd(), 'data', 'leads.json');

function ensureFallbackDirectory() {
  const dir = path.dirname(FALLBACK_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(FALLBACK_FILE_PATH)) {
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getLocalLeads() {
  ensureFallbackDirectory();
  try {
    const raw = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local leads fallback:', err);
    return [];
  }
}

export function saveLocalLead(leadData) {
  ensureFallbackDirectory();
  const leads = getLocalLeads();
  const id = new ObjectId().toString();
  const newLead = {
    _id: id,
    ...leadData,
    status: leadData.status || 'New',
    createdAt: leadData.createdAt || new Date().toISOString(),
    storedLocally: true,
  };
  leads.unshift(newLead);
  fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(leads, null, 2), 'utf-8');
  return newLead;
}

export function updateLocalLeadStatus(leadId, status) {
  ensureFallbackDirectory();
  const leads = getLocalLeads();
  let updated = false;
  const newLeads = leads.map((item) => {
    if (item._id === leadId) {
      updated = true;
      return { ...item, status, updatedAt: new Date().toISOString() };
    }
    return item;
  });
  if (updated) {
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(newLeads, null, 2), 'utf-8');
  }
  return updated;
}

export function deleteLocalLead(leadId) {
  ensureFallbackDirectory();
  const leads = getLocalLeads();
  const filtered = leads.filter((item) => item._id !== leadId);
  fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
  return leads.length !== filtered.length;
}

const directMongoUri = 'mongodb://sainikeshav29001_db_user:DD79wwPa7QAM2DQG@cluster0-shard-00-00.eknuo0v.mongodb.net:27017,cluster0-shard-00-01.eknuo0v.mongodb.net:27017,cluster0-shard-00-02.eknuo0v.mongodb.net:27017/appmotive?ssl=true&replicaSet=atlas-13d80z-shard-0&authSource=admin&retryWrites=true&w=majority';

export async function getMongoClient() {
  const uri = process.env.MONGODB_URI || directMongoUri;

  // Try connecting with standard URI first
  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    return { client, isDirect: false };
  } catch (srvError) {
    console.warn('Standard MongoDB connection failed, trying direct shard connection:', srvError.message);
    try {
      const directClient = new MongoClient(directMongoUri, { serverSelectionTimeoutMS: 5000 });
      await directClient.connect();
      return { client: directClient, isDirect: true };
    } catch (directError) {
      console.warn('Direct MongoDB connection also failed:', directError.message);
      throw directError;
    }
  }
}
