import { getCollection } from '../db.js';

const collectionLicensePlate = await getCollection('licensePlateDb');

/**
 * Obtém ou cria um novo registro de placa de veículo com base no número fornecido.
 * @param {object} licensePlate - Informações da placa de veículo a serem verificadas ou inseridas.
 * @returns {Promise<object>} - Retorna o registro da placa de veículo encontrado ou o novo registro criado.
 */
export async function getOrCreateLicensePlate(licensePlate) {
  const newLicensePlate = await collectionLicensePlate.findOne({
    number: licensePlate.number,
  });
  if (newLicensePlate) {
    return newLicensePlate;
  }
  return await collectionLicensePlate.insertOne(licensePlate);
}

/**
 * Obtém informações de uma placa de veículo com base no número fornecido.
 * @param {string} number - Número da placa de veículo a ser buscado.
 * @returns {Promise<object|null>} - Retorna as informações da placa de veículo encontrada ou null se não encontrada.
 */
export async function getLicensePlate(number) {
  return await collectionLicensePlate.findOne({ number: number });
}
