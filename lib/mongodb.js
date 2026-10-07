import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://sainikeshav29001_db_user:DD79wwPa7QAM2DQG@cluster0-shard-00-00.eknuo0v.mongodb.net:27017,cluster0-shard-00-01.eknuo0v.mongodb.net:27017,cluster0-shard-00-02.eknuo0v.mongodb.net:27017/appmotive?ssl=true&replicaSet=atlas-13d80z-shard-0&authSource=admin&retryWrites=true&w=majority';

let client;
let clientPromise;

function createClientPromise() {
  const c = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  const p = c.connect().catch((err) => {
    if (process.env.NODE_ENV === 'development') {
      global._mongoClientPromise = null;
    }
    console.warn('MongoDB clientPromise connect error:', err.message);
    return c;
  });

  return p;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export default clientPromise;
