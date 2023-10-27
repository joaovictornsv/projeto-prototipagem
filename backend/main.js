import express from 'express'
import cors from 'cors'
import {DatabaseName, getDatabase} from "./db.js";
import {CreateWeighing, verifyWeight, WeighingStatusEnum} from './collections/weighingCollection.js'
import { faker } from '@faker-js/faker';
import {ObjectId} from "mongodb";

const app = express()
app.use(cors())
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
  const licensePlatesCollection = await getCollection(Collections.WEIGHINGS)
  const licensePlate = await licensePlatesCollection.findOne({
    license_plate_number: number
  })

  const weighingsCollection = await getCollection(Collections.WEIGHINGS)
  const weighing = await weighingsCollection.findOne({
    license_plate_number: number,
    status: WeighingStatusEnum.PENDING
  }, { _id: -1 })

  const allowed = !!(licensePlate && !!weighing)

  res.json({
    allowed,
    ...(allowed && {
      weighing_id: weighing._id,
      load_weight: weighing.load_weight
    })
  })
})

app.post('/verify-weight/:weighing_id', async (req, res) => {
  const {weighing_id} = req.params
  const { measuredWeight } = req.body

  const collection = await getCollection(Collections.WEIGHINGS)
  const weighing = await collection.findOne(new ObjectId(weighing_id))
  const allowed = await verifyWeight(weighing, measuredWeight)

  res.json({
    allowed
  })
})

app.get('/license-plate-info', async (req, res) => {
  res.json({
    model: faker.vehicle.vehicle(),
    year: `${faker.date.past({ years: 20 }).getFullYear()}`
  })
})

const amountToCents = (amount) => amount * 100

app.get('/invoice-info', async (req, res) => {
  res.json({
    company: faker.company.name(),
    loadItems: [faker.commerce.productName()],
    loadWeight: `${faker.number.int({ min: 300, max: 15_000 })}`,
    amount: Number(faker.finance.amount({ min: amountToCents(1_000), max: amountToCents(20_000) }))
  })
})


app.get('/weighings', async (req, res) => {
  const collection = await getCollection(Collections.WEIGHINGS)
  const weighings =  await collection.find().sort({_id:-1}).limit(10).toArray();

  res.json(weighings)
})

app.post('/create/weighing', async (req, res) => {
  const response = await CreateWeighing(req)
  res.json(response)
})

app.put('/finalize/weighing/:weighing_id',async (req, res) => {
  const {weighing_id}= req.params

  const collection = await getCollection(Collections.WEIGHINGS)
  const response =  await collection.updateOne({_id: new ObjectId(weighing_id)}, {
    $set: { status: WeighingStatusEnum.DONE }
  }, {})

  res.json(response)
})

app.listen(3000, () => console.log('Server running on port 3000'))
