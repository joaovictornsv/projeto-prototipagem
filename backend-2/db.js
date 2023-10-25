import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://root:root@cluster0.gqtpff3.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
export const DatabaseName = 'PrototipagemDb';

export const getDatabase = async (dbName) => {
  await client.connect();
  return client.db(dbName);
}

export const getCollection = async (collectionName) => {
  const db = await getDatabase(DatabaseName)
  return db.collection(collectionName)
}