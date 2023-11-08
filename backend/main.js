import express from 'express';
import cors from 'cors';
import { DatabaseName, getDatabase } from './db.js';
import {
  CreateWeighing,
  saveFullLoadWeight,
  WeighingStatusEnum,
  sendRecentWeighingsToSocket,
  sendWeighingDetailsToSocket,
} from './collections/weighingCollection.js';
import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Collections } from './collections/collectionsUtils.js';

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: [
      'https://jifxwj4sxqahefy5o-projetos-faculdade.svc.zcloud.ws',
      'http://localhost:5173',
    ],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log('Connection established', socket.id);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const getCollection = async (collectionName) => {
  const db = await getDatabase(DatabaseName);
  return db.collection(collectionName);
};

app.get('/drivers', async (req, res) => {
  const collection = await getCollection(Collections.DRIVERS);
  const drivers = await collection.find().toArray();

  res.json(drivers);
});

app.get('/driver/:name', async (req, res) => {
  const { name } = req.params;

  const collection = await getCollection(Collections.DRIVERS);
  const driver = await collection.findOne({ name: name });

  res.json(driver);
});

app.get('/verify-plate/:number', async (req, res) => {
  const { number } = req.params;
  const licensePlatesCollection = await getCollection(Collections.WEIGHINGS);
  const licensePlate = await licensePlatesCollection.findOne({
    license_plate_number: number,
  });

  const weighingsCollection = await getCollection(Collections.WEIGHINGS);
  const pendingWeighingStatus = [
    WeighingStatusEnum.PENDING,
    WeighingStatusEnum.WAITING_WEIGHT_CONFIRMATION,
  ];
  const weighing = await weighingsCollection.findOne(
    {
      license_plate_number: number,
      status: { $in: pendingWeighingStatus },
    },
    { _id: -1 },
  );

  const allowed = !!(licensePlate && !!weighing);

  res.json({
    allowed,
    ...(allowed && {
      weighing_id: weighing._id,
      load_weight: weighing.load_weight,
    }),
  });
});

// Primeira pesagem
app.post('/save_full_load_weight/:weighingId', async (req, res) => {
  const { weighingId } = req.params;
  const { measuredWeight } = req.body;

  const allowed = await saveFullLoadWeight(weighingId, measuredWeight);

  await sendRecentWeighingsToSocket(req.io);
  await sendWeighingDetailsToSocket(req.io, weighingId);
  res.json({
    allowed,
  });
});

// Segunda pesagem
app.post('/verify_weight/:weighingId', async (req, res) => {
  const { weighingId } = req.params;
  const { measuredUnloadWeight } = req.body;

  const collection = await getCollection(Collections.WEIGHINGS);
  const weighing = await collection.findOne(new ObjectId(weighingId));

  const allowed = await saveFullLoadWeight(weighing, measuredUnloadWeight);

  await sendRecentWeighingsToSocket(req.io);
  await sendWeighingDetailsToSocket(req.io, weighingId);
  res.json({
    allowed,
  });
});

app.get('/license-plate-info', async (req, res) => {
  res.json({
    model: faker.vehicle.vehicle(),
    year: `${faker.date.past({ years: 20 }).getFullYear()}`,
  });
});

const amountToCents = (amount) => amount * 100;

app.get('/invoice-info', async (req, res) => {
  res.json({
    company: faker.company.name(),
    loadItems: [faker.commerce.productName()],
    loadWeight: `${faker.number.int({ min: 300, max: 15_000 })}`,
    amount: Number(
      faker.finance.amount({
        min: amountToCents(1_000),
        max: amountToCents(20_000),
      }),
    ),
  });
});

app.get('/weighings', async (req, res) => {
  const collection = await getCollection(Collections.WEIGHINGS);
  const weighings = await collection
    .find()
    .sort({ _id: -1 })
    .limit(10)
    .toArray();

  res.json(weighings);
});

app.post('/create/weighing', async (req, res) => {
  const response = await CreateWeighing(req);
  res.json(response);
});

app.put('/finalize/weighing/:weighingId', async (req, res) => {
  const { weighingId } = req.params;

  const collection = await getCollection(Collections.WEIGHINGS);
  const response = await collection.updateOne(
    { _id: new ObjectId(weighingId) },
    {
      $set: { status: WeighingStatusEnum.DONE },
    },
    {},
  );

  await sendRecentWeighingsToSocket(req.io);
  await sendWeighingDetailsToSocket(req.io, weighingId);
  res.json(response);
});

export { http, io };
