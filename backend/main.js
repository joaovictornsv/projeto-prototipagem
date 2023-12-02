import express from 'express';
import cors from 'cors';
import { DatabaseName, getDatabase } from './db.js';
import {
  CreateWeighing,
  saveFullLoadWeight,
  WeighingStatusEnum,
  sendRecentWeighingsToSocket,
  sendWeighingDetailsToSocket,
  verifyUnloadWeight,
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

/**
 * Retorna a coleção do banco de dados com base no nome fornecido.
 * @param {string} collectionName - Nome da coleção a ser recuperada.
 * @returns {Promise<Collection>} - Retorna a coleção do banco de dados.
 */
const getCollection = async (collectionName) => {
  const db = await getDatabase(DatabaseName);
  return db.collection(collectionName);
};

/**
 * Obtém todos os motoristas.
 * @name GET /drivers
 */
app.get('/drivers', async (req, res) => {
  const collection = await getCollection(Collections.DRIVERS);
  const drivers = await collection.find().toArray();

  res.json(drivers);
});

/**
 * Obtém detalhes de um motorista com um nome específico.
 * @name GET /drivers/:name
 */
app.get('/driver/:name', async (req, res) => {
  const { name } = req.params;

  const collection = await getCollection(Collections.DRIVERS);
  const driver = await collection.findOne({ name: name });

  res.json(driver);
});

/**
 * Verifica a placa e o status de pesagem de um veículo.
 * @name GET /verify-plate/:number
 */
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
      status: weighing.status,
    }),
  });
});

/**
 * Salva o peso total de uma pesagem.
 * @name POST /save_full_load_weight/:weighingId
 */
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

/**
 * Verifica o peso de descarga de uma pesagem.
 * @name POST /verify_weight/:weighingIdT
 */
app.post('/verify_weight/:weighingId', async (req, res) => {
  const { weighingId } = req.params;
  const { measuredUnloadWeight } = req.body;

  const allowed = await verifyUnloadWeight(weighingId, measuredUnloadWeight);

  await sendRecentWeighingsToSocket(req.io);
  await sendWeighingDetailsToSocket(req.io, weighingId);
  res.json({
    allowed,
  });
});

/**
 * Retorna informações simuladas sobre uma placa de veículo.
 * @name GET /license-plate-info
 */
app.get('/license-plate-info', async (req, res) => {
  res.json({
    model: faker.vehicle.vehicle(),
    year: `${faker.date.past({ years: 20 }).getFullYear()}`,
  });
});

const amountToCents = (amount) => amount * 100;

/**
 * Retorna informações simuladas sobre uma fatura.
 * @name GET /invoice-info
 */
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

/**
 * Obtém as últimas pesagens.
 * @name GET /weighings
 */
app.get('/weighings', async (req, res) => {
  const collection = await getCollection(Collections.WEIGHINGS);
  const weighings = await collection
    .find()
    .sort({ _id: -1 })
    .limit(10)
    .toArray();

  res.json(weighings);
});

/**
 * Cria uma nova pesagem.
 * @name POST /create/weighingT
 */
app.post('/create/weighing', async (req, res) => {
  const response = await CreateWeighing(req);
  await sendRecentWeighingsToSocket(req.io);
  res.json(response);
});

/**
 * Finaliza uma pesagem específica.
 * @name PUT  /finalize/weighing/:weighingId
 */
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
