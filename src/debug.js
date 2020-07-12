'use strict';

const debug = require('debug');
const config = require('./config');

if (config.dev) debug.enable('app');

module.exports = debug('app');
