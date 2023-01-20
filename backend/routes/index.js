const express = require('express');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRoutes = require('./auth');
const auth = require('../middlewares/auth');
const { NotFoundErr } = require('../errors');
/*const corsHandler = require('../middlewares/cors');*/

const routes = express.Router();

routes.use('/', /*corsHandler, */authRoutes);
routes.use('/users', /*corsHandler, */auth, userRoutes);
routes.use('/cards', /*corsHandler, */auth, cardRoutes);

routes.use('/', express.json(), auth, (req, res, next) => {
  try {
    throw new NotFoundErr('Страница не найдена');
  } catch (err) {
    next(err);
  }
});

module.exports = routes;
