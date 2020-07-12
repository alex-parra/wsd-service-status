'use strict';
const debug = require('./debug');
const fetch = require('node-fetch');

const URLS = {
  auth: 'https://staging-authentication.wallstreetdocs.com/oauth/token',
};

const credentials = {
  grant_type: null,
  client_id: null,
  client_secret: null,
};

const auth = {
  token: null,
};

function init(apiConfig) {
  credentials.grant_type = apiConfig.grantType;
  credentials.client_id = apiConfig.clientId;
  credentials.client_secret = apiConfig.clientSecret;
}

function authenticate() {
  return new Promise((resolve, reject) => {
    if (auth.token) {
      debug('Already authed...');
      return resolve();
    }

    return fetch(URLS.auth, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        return res.ok ? res.json() : reject(new Error('Authentication failed with status: '.res.status));
      })
      .then((data) => {
        auth.token = data.access_token;
        resolve();
      });
  });
}

function getToken() {
  return auth.token;
}

module.exports = {
  init,
  authenticate,
  getToken,
};
