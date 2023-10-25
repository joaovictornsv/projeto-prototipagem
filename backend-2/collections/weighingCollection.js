import { getCollection } from "../db.js"
import getOrCreateInvoice from "./invoiceCollection.js"
import {getLicensePlate, getOrCreateLicensePlate} from "./licensePlateCollection.js"
import getOrCreateDriver from "./driverCollection.js"


const collectionWeighings = await getCollection('weighingDb')

export async function CreateWeighing(req){

  getOrCreateDriver({
    name: req.body.driver.name,
    document_number: req.body.driver.document_number
  })

  getOrCreateLicensePlate({
    number: req.body.license_plate.number,
    vehicle_year: req.body.license_plate.vehicle_year,
    vehicle_model: req.body.license_plate.vehicle_model
  })

  getOrCreateInvoice({
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
    status: "pending"
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