'use strict';

const path = require('path');
const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const nocache = require('nocache');

// Set up debugging
const debug = require('./debug');

// Init api
const api = require('./api');
api.init(config.api);

// Init app
const app = express();
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(cors());
app.use(nocache());
require('./helmet')(app);

// Routes
app.get('/', (req, res) => {
  api.authenticate();
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Launch
app.listen(config.port, () => {
  debug('Listening on port %s...', config.port);
});
