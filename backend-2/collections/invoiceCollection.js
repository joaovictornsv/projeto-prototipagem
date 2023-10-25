import { getCollection } from "../db.js"

const collectionInvoices = await getCollection('invoiceDb')

export default async function getOrCreateInvoice(invoice){
    const newInvoice = await collectionInvoices.findOne({"company_name": invoice.company_name, "load_items": invoice.load_items, 'load_weight': invoice.load_weight, 'amount': invoice.amount})
    if(newInvoice){
        return newInvoice
    }
    return await collectionInvoices.insertOne(invoice)
}