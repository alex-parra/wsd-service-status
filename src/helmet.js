'use strict';

const helmet = require('helmet');

module.exports = function(app) {
  app.use(
    helmet({
      hidePoweredBy: { setTo: 'PHP' },
      frameguard: { action: 'deny' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"], // eslint-disable-line quotes
          imgSrc: ["'self'"], // eslint-disable-line quotes
          styleSrc: ["'self'"], // eslint-disable-line quotes
          scriptSrc: ["'self'", 'cdnjs.cloudflare.com'], // eslint-disable-line quotes
        },
      },
    })
  );
};
