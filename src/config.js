'use strict';

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  dev: process.env.NODE_ENV !== 'production',
  api: {
    grantType: process.env.API_GRANT_TYPE,
    clientId: process.env.API_CLIENT_ID,
    clientSecret: process.env.API_CLIENT_SECRET,
  },
};
