import { getCollection } from '../db.js';

const collectionDriver = await getCollection('driverDb');

/**
 * Obtém ou cria um novo registro de motorista com base no número do documento fornecido.
 * @param {object} driver - Informações do motorista a serem verificadas ou inseridas.
 * @returns {Promise<object>} - Retorna o registro do motorista encontrado ou o novo registro criado.
 */
export default async function getOrCreateDriver(driver) {
  const newDriver = await collectionDriver.findOne({
    document_number: driver.document_number,
  });
  if (newDriver) {
    return newDriver;
  }
  return await collectionDriver.insertOne(driver);
}
