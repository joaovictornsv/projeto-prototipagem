import express from 'express'
import {DatabaseName, getDatabase} from "./db.js";
import { BSON } from 'mongodb';

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const Collections = {
  DRIVERS: 'driverDb',
  WEIGHINGS: 'weighingDb',
  INVOICES: 'invoiceDb',
  LICENSE_PLATES: 'licensePlateDb'
}

const getCollection = async (collectionName) => {
  const db = await getDatabase(DatabaseName)
  return db.collection(collectionName)
}

app.get('/', async (req, res) => {
  res.json({ ok: true })
})

app.get('/drivers', async (req, res) => {
  const collection = await getCollection(Collections.DRIVERS)
  const drivers = await collection.find().toArray()

  res.json(drivers)
})

app.get('/driver/:name', async (req, res) => {
  const {name} = req.params

  const collection = await getCollection(Collections.DRIVERS)
  const driver = await collection.findOne({"name": name})

  res.json(driver)
})

app.get('/verify-weighing/:number', async (req, res) => {
  const {number} = req.params
  const collection = await getCollection(Collections.WEIGHINGS)
  const licensePlate = await collection.findOne({"license_plate_number": number})

  res.json({
    allowed: licensePlate 
  })
})     

app.get('/license-plate-info', async (req, res) => {
  res.json({
    model: 'Fiat Uno',
    year: '2023'
  })
})

app.get('/invoice-info', async (req, res) => {
  res.json({
    company: 'Company X',
    loadItems: ["Casaco","Tecido"],
    loadWeight: '100'
  })
})


app.get('/weighings', async (req, res) => {
  const collection = await getCollection(Collections.DRIVERS)
  const weighings =  await collection.find().toArray()

  res.json(weighings)
})

app.post('/create/weighing', async (req, res) => {
  const collectionDriver = await getCollection(Collections.DRIVERS)
  const driver = await collectionDriver.insertOne({
    name: req.body.driver.name,
    document_number: req.body.driver.document_number
  })

  const collectionLicensePlate = await getCollection(Collections.LICENSE_PLATES)
  const licensePlate = await collectionLicensePlate.insertOne({
    number: req.body.license_plate.number,
    vehicle_year: req.body.license_plate.vehicle_year,
    vehicle_model: req.body.license_plate.vehicle_model
  })

  const collectionInvoices = await getCollection(Collections.INVOICES)
  const invoice = await collectionInvoices.insertOne({
    company_name: req.body.invoice.company_name,
    load_weight: req.body.invoice.load_weight,
    load_items: req.body.invoice.load_items,
    amount: req.body.invoice.amount
  })

  const collectionWeighings = await getCollection(Collections.WEIGHINGS)

  const licensePlateNumber = await collectionLicensePlate.findOne(licensePlate.insertedId)

  const weighing = await collectionWeighings.insertOne({
    driver_id: driver.insertedId,
    license_plate_number: licensePlateNumber.number,
    invoice_id: invoice.insertedId,
    status: "pending"
  })

  res.json(weighing)
})


app.listen(3000, () => console.log('Server running on port 3000'))
