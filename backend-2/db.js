import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://root:root@cluster0.gqtpff3.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
export const DatabaseName = 'mongo-docker';

export const getDatabase = async (dbName) => {
  await client.connect();
  return client.db(dbName);
}
