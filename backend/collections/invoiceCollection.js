import { getCollection } from '../db.js';

const collectionInvoices = await getCollection('invoiceDb');

export async function getOrCreateInvoice(invoice) {
  const newInvoice = await collectionInvoices.findOne({
    barcode: invoice.barcode,
  });
  if (newInvoice) {
    return newInvoice;
  }
  return await collectionInvoices.insertOne(invoice);
}

export async function updateInvoiceLoadWeight(invoice, weight) {
  return await collectionInvoices.updateOne(
    { _id: new ObjectId(invoice._id) },
    {
      $set: {  load_weight: weight },
    },
    {},)
}

export async function updateInvoiceUnloadWeight(invoice, weight) {
  return await collectionInvoices.updateOne(
    { _id: new ObjectId(invoice._id) },
    {
      $set: {  unload_weight: weight },
    },
    {},)
}