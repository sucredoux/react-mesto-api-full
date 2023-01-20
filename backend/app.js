/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
/*const cors = require('cors');*/
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/err-handler');

const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.set('strictQuery', true);
/*app.use(cors());*/
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);
routes.use(errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect(MONGO_URL);
  console.log('Server connect db');
  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}
connect();
