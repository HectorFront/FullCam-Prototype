const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('../routes/routes');
const cors = require('../config/cors');
require('../config/database');

const app = express();
  
app.set('port', 8080);
app.use(cors);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

module.exports = app;


