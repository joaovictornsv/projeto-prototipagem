import { getCollection } from "../db.js"
import getOrCreateInvoice from "./invoiceCollection.js"
import {getLicensePlate, getOrCreateLicensePlate} from "./licensePlateCollection.js"
import getOrCreateDriver from "./driverCollection.js"


const collectionWeighings = await getCollection('weighingDb')

export const WeighingStatusEnum = {
  PENDING: 'PENDING',
  DONE: 'DONE'
}

export async function CreateWeighing(req){

  const driver = await getOrCreateDriver({
    name: req.body.driver.name,
    document_number: req.body.driver.document_number
  })

  const licensePlate = await getOrCreateLicensePlate({
    number: req.body.license_plate.number,
    vehicle_year: req.body.license_plate.vehicle_year,
    vehicle_model: req.body.license_plate.vehicle_model
  })

  const invoice = await getOrCreateInvoice({
    company_name: req.body.invoice.company_name,
    load_weight: req.body.invoice.load_weight,
    load_items: req.body.invoice.load_items,
    amount: req.body.invoice.amount,
    barcode: req.body.invoice.barcode
  })

  const weighing = {
    driver_document_number: req.body.driver.document_number,
    license_plate_number: req.body.license_plate.number,
    invoice_barcode: req.body.invoice.barcode,
    status: WeighingStatusEnum.PENDING,
    driver_id: driver._id,
    license_plate_id: licensePlate._id,
    invoice_id: invoice._id,
    driver_name: req.body.driver.name,
    company: req.body.invoice.company_name,
    load_weight: req.body.invoice.load_weight,
    amount: req.body.invoice.amount,
    createdAt: new Date(),
  }

  return await getOrCreateWeighing(weighing)
}

export async function getOrCreateWeighing(weighing){
    const newWeighing = await collectionWeighings.findOne({"invoice_barcode": weighing.invoice_barcode, 'driver_document_number': weighing.driver_document_number, 'license_plate_number': weighing.license_plate_number})
    if(newWeighing){
        return newWeighing
    }
    return await collectionWeighings.insertOne(weighing)
}

export async function verifyWeight(weighing, weight){
    const invoiceWeight = getOrCreateInvoice({barcode: weighing.invoice_barcode}).load_weight

    const tolerance = 0.05
    const errorMargin = invoiceWeight * tolerance

    const diff = Math.abs(weight - invoiceWeight)
    return diff <= errorMargin
}
