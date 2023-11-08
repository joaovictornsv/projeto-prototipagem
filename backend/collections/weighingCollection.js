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
    expected_load_weight: req.body.invoice.load_weight,
    expected_unload_weight: req.body.invoice.unload_weight,
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

export async function saveFullLoadWeight(weighingId, measuredWeight) {
  const collection = await getCollection(Collections.WEIGHINGS);
  const weighing = await collection.findOne(new ObjectId(weighingId));

  if (!weighing) {
    return false;
  }

  await updateFullLoadWeight(weighingId, measuredWeight);

  return true;
}

export async function verifyUnloadWeight(weighingId, measuredUnloadWeight) {
  const collection = await getCollection(Collections.WEIGHINGS);
  const weighing = await collection.findOne(new ObjectId(weighingId));

  if (!weighing) {
    return false;
  }

  await updateUnloadWeight(weighingId, measuredUnloadWeight);

  const loadWeight = weighing.full_load_weight - measuredUnloadWeight;
  const invoice = await getOrCreateInvoice({
    barcode: weighing.invoice_barcode,
  });
  const invoiceWeight = Number(invoice.unload_weight);

  const tolerance = 0.05;
  const errorMargin = invoiceWeight * tolerance;

  const diff = Math.abs(Number(loadWeight) - invoiceWeight);
  return diff <= errorMargin;
}

export const getRecentWeighings = async () => {
  const collection = await getCollection(Collections.WEIGHINGS);
  return collection.find().sort({ _id: -1 }).limit(10).toArray();
};

export const getWeighingDetails = async (weighingId) => {
  const collection = await getCollection(Collections.WEIGHINGS);
  return collection.findOne({ _id: weighingId });
};

export const sendRecentWeighingsToSocket = async (socket) => {
  const weighings = await getRecentWeighings();
  socket.emit('listRecentWeighings', weighings);
};

export const sendWeighingDetailsToSocket = async (socket, weighingId) => {
  const weighing = await getWeighingDetails(weighingId);
  socket.emit('listWeighingDetails', weighing);
};
