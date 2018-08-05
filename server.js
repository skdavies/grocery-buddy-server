require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import router from './src/router.js';
import logger from 'morgan';

let app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

const port = process.env.GSM_PORT || 3000;

import models from './src/models/index.js'

models.sequelize.sync({ underscore: true }).then(() => {
  app.listen(port, () => {
    console.log('Your Server is up and running');
  });
});