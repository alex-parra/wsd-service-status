'use strict';
const debug = require('./debug');
const fetch = require('node-fetch');

const URLS = {
  auth: 'https://staging-authentication.wallstreetdocs.com/oauth/token',
  requestReport: 'https://staging-gateway.priipcloud.com/api/v2.0/gateway/reports/status/service',
  fetchReport: 'https://staging-gateway.priipcloud.com/api/v2.0/gateway/reports/status/service/',
};

const credentials = {
  grant_type: null,
  client_id: null,
  client_secret: null,
};

const auth = {
  token: null,
  expires: null,
};

const report = {
  secondsToRefresh: 3600,
  jobId: null,
  data: null,
  expires: null,
};

function init(apiConfig) {
  credentials.grant_type = apiConfig.grantType;
  credentials.client_id = apiConfig.clientId;
  credentials.client_secret = apiConfig.clientSecret;
  if (apiConfig.reportLifetime) {
    report.secondsToRefresh = apiConfig.reportLifetime;
  }
}

function authExpired() {
  if (!auth.expires) return true;
  return auth.expires.getTime() < Date.now();
}

function authenticate() {
  if (!authExpired()) return Promise.resolve(auth.token);

  return new Promise(function(resolve, reject) {
    return fetch(URLS.auth, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(function(res) {
        return res.ok ? res.json() : reject(new Error('Authentication failed with status: '.res.status));
      })
      .then(function(data) {
        auth.token = data.access_token;
        auth.expires = new Date(Date.now() + data.expires_in * 1000);
        resolve(auth.token);
      });
  });
}

function requestReport() {
  if (report.jobId && !reportExpired()) return Promise.resolve(report.jobId);

  return new Promise(function(resolve, reject) {
    return authenticate().then(function(token) {
      return fetch(URLS.requestReport, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token },
      })
        .then(function(res) {
          return res.ok ? res.json() : reject(new Error('Request Report failed with status: '.res.status));
        })
        .then(function(data) {
          report.jobId = data.job_id;
          report.expires = new Date(Date.now() + report.secondsToRefresh * 1000);
          resolve();
        });
    });
  });
}

function reportExpired() {
  if (!report.expires) return true;
  return report.expires.getTime() < Date.now();
}

function fetchReport() {
  debug('fetchReport');
  return fetch(URLS.fetchReport + report.jobId, {
    headers: { Authorization: 'Bearer ' + auth.token },
  }).then(function(res) {
    if (res.ok) return res.json();
    return new Promise(function(resolve) {
      setTimeout(resolve, 1000);
    }).then(fetchReport);
  });
}

function getReport() {
  if (!reportExpired()) return Promise.resolve(report.data);

  return new Promise(function(resolve) {
    return requestReport().then(function() {
      return fetchReport().then(function(data) {
        report.data = data;
        resolve(report.data);
      });
    });
  });
}

module.exports = {
  init,
  getReport,
};
