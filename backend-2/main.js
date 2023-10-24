import express from 'express'
import {DatabaseName, getDatabase} from "./db.js";

const app = express()

app.get('/drivers', async (req, res) => {
  const db = await getDatabase(DatabaseName)
  const users = await db.collection('driverDb').find().toArray()

  res.json(users)
})

app.get('/weighings', async (req, res) => {
  const db = await getDatabase(DatabaseName)
  const weighings =  await db.collection('weighingsDb').find().toArray()

  res.json(weighings)
})

app.listen(3000, () => console.log('Server running on port 3000'))
