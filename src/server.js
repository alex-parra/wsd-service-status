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

// Main route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Report json
app.get('/report', function(req, res) {
  api
    .getReport()
    .then(function(report) {
      res.json(report);
    })
    .catch(function(error) {
      res.status(500).json({ error: error.message });
    });
});

// Launch
app.listen(config.port, function() {
  debug('Listening on port %s...', config.port);
});
