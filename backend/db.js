import { MongoClient } from 'mongodb';
import { configDotenv } from 'dotenv';

configDotenv();

// Connection URL
const url = process.env.MONGO_CONNECTION_URL;
const client = new MongoClient(url);

// Database Name
export const DatabaseName = process.env.DB_NAME;

/**
 * Conecta ao banco de dados e retorna o objeto de banco de dados.
 * @param {string} dbName - Nome do banco de dados a ser conectado.
 * @returns {Promise<Db>} - Retorna o objeto de banco de dados conectado.
 */
export const getDatabase = async (dbName) => {
  await client.connect();
  return client.db(dbName);
};

/**
 * Conecta ao banco de dados e retorna o objeto de banco de dados.
 * @param {string} dbName - Nome do banco de dados a ser conectado.
 * @returns {Promise<Db>} - Retorna o objeto de banco de dados conectado.
 */
export const getCollection = async (collectionName) => {
  const db = await getDatabase(DatabaseName);
  return db.collection(collectionName);
};
