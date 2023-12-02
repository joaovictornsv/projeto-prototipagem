import { getCollection } from '../db.js';
import { ObjectId } from 'mongodb';
import { Collections } from './collectionsUtils.js';
import { WeighingStatusEnum } from './weighingCollection.js';

const collectionInvoices = await getCollection('invoiceDb');
const weighingsCollection = await getCollection(Collections.WEIGHINGS);

/**
 * Obtém ou cria uma nova fatura com base no código de barras fornecido.
 * @param {object} invoice - Informações da fatura a serem verificadas ou criadas.
 * @returns {Promise<object>} - Retorna a fatura encontrada ou a nova fatura criada.
 */
export async function getOrCreateInvoice(invoice) {
  const newInvoice = await collectionInvoices.findOne({
    barcode: invoice.barcode,
  });
  if (newInvoice) {
    return newInvoice;
  }

  return await collectionInvoices.insertOne(invoice);
}

/**
 * Atualiza o peso total de uma pesagem específica.
 * @param {string} weighingId - ID da pesagem a ser atualizada.
 * @param {number} measuredWeight - Peso medido a ser atualizado.
 * @returns {Promise<object>} - Retorna o resultado da operação de atualização.
 */
export async function updateFullLoadWeight(weighingId, measuredWeight) {
  return weighingsCollection.updateOne(
    { _id: new ObjectId(weighingId) },
    {
      $set: {
        full_load_weight: measuredWeight,
        status: WeighingStatusEnum.WAITING_WEIGHT_CONFIRMATION,
      },
    },
  );
}

/**
 * Atualiza o peso de descarga de uma pesagem específica.
 * @param {string} weighingId - ID da pesagem a ser atualizada.
 * @param {number} measuredUnloadWeight - Peso de descarga medido a ser atualizado.
 * @returns {Promise<object>} - Retorna o resultado da operação de atualização.
 */
export async function updateUnloadWeight(weighingId, measuredUnloadWeight) {
  return weighingsCollection.updateOne(
    { _id: new ObjectId(weighingId) },
    {
      $set: { unload_weight: measuredUnloadWeight },
    },
  );
}
