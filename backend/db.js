import { MongoClient } from 'mongodb'
import {configDotenv} from "dotenv";

configDotenv()

// Connection URL
const url = process.env.MONGO_CONNECTION_URL;
const client = new MongoClient(url);

// Database Name
export const DatabaseName = process.env.DB_NAME;

export const getDatabase = async (dbName) => {
  await client.connect();
  return client.db(dbName);
}

export const getCollection = async (collectionName) => {
  const db = await getDatabase(DatabaseName)
  return db.collection(collectionName)
}
