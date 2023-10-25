import express from 'express'
import {DatabaseName, getDatabase} from "./db.js";
import {CreateWeighing, verifyWeight} from './collections/weighingCollection.js'

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

app.get('/verify-plate/:number', async (req, res) => {
  const {number} = req.params
  const collection = await getCollection(Collections.WEIGHINGS)
  const licensePlate = await collection.findOne({"license_plate_number": number})

  res.json({
    allowed: licensePlate 
  })
})     

app.post('/verify-weight/', async (req, res) => {
  const collection = await getCollection(Collections.WEIGHINGS)
  const weighing = await collection.findOne({"_id": req.weighing_id})

  res.json({
    check: verifyWeight(weighing, req.weight)
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
  res.json(CreateWeighing(req))
})


app.listen(3000, () => console.log('Server running on port 3000'))
