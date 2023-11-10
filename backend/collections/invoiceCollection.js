import { getCollection } from '../db.js';
import { ObjectId } from 'mongodb';
import { Collections } from './collectionsUtils.js';
import { WeighingStatusEnum } from './weighingCollection.js';

const collectionInvoices = await getCollection('invoiceDb');
const weighingsCollection = await getCollection(Collections.WEIGHINGS);

export async function getOrCreateInvoice(invoice) {
  const newInvoice = await collectionInvoices.findOne({
    barcode: invoice.barcode,
  });
  if (newInvoice) {
    return newInvoice;
  }

  return await collectionInvoices.insertOne(invoice);
}

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

export async function updateUnloadWeight(weighingId, measuredUnloadWeight) {
  return weighingsCollection.updateOne(
    { _id: new ObjectId(weighingId) },
    {
      $set: { unload_weight: measuredUnloadWeight },
    },
  );
}
