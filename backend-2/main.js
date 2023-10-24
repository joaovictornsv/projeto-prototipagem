import express from 'express'
import {DatabaseName, getDatabase} from "./db.js";

const app = express()

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

app.get('/drivers', async (req, res) => {c
  const collection = await getCollection(Collections.DRIVERS)
  const drivers = await collection.find().toArray()

  res.json(drivers)
})

app.get('/verify-license-plate/:number', async (req, res) => {
  const {number} = req.params

  res.json({
    allowed: number === 'ABC1D34'
  })
})

app.get('/verify-weighing/:number', async (req, res) => {
  const {number} = req.params

  res.json({
    allowed: number === 'ABC1D34'
  })
})

app.get('/license-plate-info', async (req, res) => {
  res.json({
    model: 'Fiat Uno',
    year: 2023
  })
})

app.get('/invoice-info', async (req, res) => {
  res.json({
    company: 'Company X',
    loadItems: ["Casaco","Tecido"],
    loadWeight: 100
  })
})


app.get('/weighings', async (req, res) => {
  const collection = await getCollection(Collections.DRIVERS)
  const weighings =  await collection.find().toArray()

  res.json(weighings)
})

app.listen(3000, () => console.log('Server running on port 3000'))
