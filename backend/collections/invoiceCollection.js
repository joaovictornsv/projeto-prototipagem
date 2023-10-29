import { getCollection } from '../db.js';

const collectionInvoices = await getCollection('invoiceDb');

export default async function getOrCreateInvoice(invoice) {
  const newInvoice = await collectionInvoices.findOne({
    barcode: invoice.barcode,
  });
  if (newInvoice) {
    return newInvoice;
  }
  return await collectionInvoices.insertOne(invoice);
}
