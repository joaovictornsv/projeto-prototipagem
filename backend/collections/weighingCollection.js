import { getCollection } from '../db.js';
import {
  getOrCreateInvoice,
  updateFullLoadWeight,
  updateUnloadWeight,
} from './invoiceCollection.js';
import { getOrCreateLicensePlate } from './licensePlateCollection.js';
import getOrCreateDriver from './driverCollection.js';
import { Collections } from './collectionsUtils.js';
import { ObjectId } from 'mongodb';

const collectionWeighings = await getCollection('weighingDb');

export const WeighingStatusEnum = {
  PENDING: 'PENDING',
  DONE: 'DONE',
  WAITING_WEIGHT_CONFIRMATION: 'WAITING_WEIGHT_CONFIRMATION',
};

/**
 * Cria uma nova pesagem com base nas informações fornecidas.
 * @param {object} req - Objeto da requisição contendo dados de driver, license_plate e invoice.
 * @returns {Promise<object>} - Retorna a nova pesagem criada.
 */
export async function CreateWeighing(req) {
  const driver = await getOrCreateDriver({
    name: req.body.driver.name,
    document_number: req.body.driver.document_number,
  });

  const licensePlate = await getOrCreateLicensePlate({
    number: req.body.license_plate.number,
    vehicle_year: req.body.license_plate.vehicle_year,
    vehicle_model: req.body.license_plate.vehicle_model,
  });

  const invoice = await getOrCreateInvoice({
    company_name: req.body.invoice.company_name,
    load_weight: req.body.invoice.load_weight,
    load_items: req.body.invoice.load_items,
    amount: req.body.invoice.amount,
    barcode: req.body.invoice.barcode,
  });

  const weighing = {
    driver_document_number: req.body.driver.document_number,
    license_plate_number: req.body.license_plate.number,
    invoice_barcode: req.body.invoice.barcode,
    status: WeighingStatusEnum.PENDING,
    driver_id: driver.insertedId,
    license_plate_id: licensePlate.insertedId,
    invoice_id: invoice.insertedId,
    driver_name: req.body.driver.name,
    company: req.body.invoice.company_name,
    load_weight: req.body.invoice.load_weight,
    vehicle_year: req.body.license_plate.vehicle_year,
    vehicle_model: req.body.license_plate.vehicle_model,
    createdAt: new Date(),
  };

  return await getOrCreateWeighing(weighing);
}

/**
 * Obtém ou cria uma nova pesagem com base nas informações fornecidas.
 * @param {object} weighing - Informações da pesagem a serem verificadas ou inseridas.
 * @returns {Promise<object>} - Retorna a pesagem encontrada ou a nova pesagem criada.
 */
export async function getOrCreateWeighing(weighing) {
  const newWeighing = await collectionWeighings.findOne({
    invoice_barcode: weighing.invoice_barcode,
    driver_document_number: weighing.driver_document_number,
    license_plate_number: weighing.license_plate_number,
  });
  if (newWeighing) {
    return newWeighing;
  }
  return await collectionWeighings.insertOne(weighing);
}

/**
 * Salva o peso total de uma pesagem específica.
 * @param {string} weighingId - ID da pesagem a ser atualizada.
 * @param {number} measuredWeight - Peso total medido a ser atualizado.
 * @returns {Promise<boolean>} - Retorna true se a operação for bem-sucedida, caso contrário, false.
 */
export async function saveFullLoadWeight(weighingId, measuredWeight) {
  const collection = await getCollection(Collections.WEIGHINGS);
  const weighing = await collection.findOne({ _id: new ObjectId(weighingId) });

  if (!weighing) {
    return false;
  }

  await updateFullLoadWeight(weighingId, measuredWeight);

  return true;
}

/**
 * Verifica o peso de descarga de uma pesagem específica e compara com o peso estimado.
 * @param {string} weighingId - ID da pesagem a ser verificada.
 * @param {number} measuredUnloadWeight - Peso de descarga medido.
 * @returns {Promise<boolean>} - Retorna true se a diferença entre os pesos for aceitável, caso contrário, false.
 */
export async function verifyUnloadWeight(weighingId, measuredUnloadWeight) {
  const collection = await getCollection(Collections.WEIGHINGS);
  const weighing = await collection.findOne({ _id: new ObjectId(weighingId) });

  if (!weighing) {
    return false;
  }

  await updateUnloadWeight(weighingId, measuredUnloadWeight);

  const estimatedLoadWeight = weighing.full_load_weight - measuredUnloadWeight;
  const invoice = await getOrCreateInvoice({
    barcode: weighing.invoice_barcode,
  });
  const invoiceWeight = Number(invoice.load_weight);
  const tolerance = 0.05;
  const errorMargin = invoiceWeight * tolerance;

  const diff = Math.abs(Number(estimatedLoadWeight) - invoiceWeight);
  return diff <= errorMargin;
}

/**
 * Obtém as últimas pesagens.
 * @returns {Promise<Array>} - Retorna um array com as últimas pesagens.
 */
export const getRecentWeighings = async () => {
  const collection = await getCollection(Collections.WEIGHINGS);
  return collection.find().sort({ _id: -1 }).limit(10).toArray();
};

/**
 * Obtém os detalhes de uma pesagem específica.
 * @param {string} weighingId - ID da pesagem a ser obtida.
 * @returns {Promise<object>} - Retorna os detalhes da pesagem encontrada.
 */
export const getWeighingDetails = async (weighingId) => {
  const collection = await getCollection(Collections.WEIGHINGS);
  return collection.findOne({ _id: new ObjectId(weighingId) });
};

/**
 * Envia as últimas pesagens para um socket.
 * @param {object} socket - Objeto de socket para envio das pesagens.
 */
export const sendRecentWeighingsToSocket = async (socket) => {
  const weighings = await getRecentWeighings();
  socket.emit('listRecentWeighings', weighings);
};

/**
 * Envia os detalhes de uma pesagem específica para um socket.
 * @param {object} socket - Objeto de socket para envio dos detalhes da pesagem.
 * @param {string} weighingId - ID da pesagem para obtenção dos detalhes.
 */
export const sendWeighingDetailsToSocket = async (socket, weighingId) => {
  const weighing = await getWeighingDetails(weighingId);
  socket.emit('listWeighingDetails', weighing);
};
