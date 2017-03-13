'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire');

module.exports = {
  createAppForTesting: (session) => {
    assert.isObject(session);

    let app = proxyquire('../src/server.js', {
      csurf: function() {
        return (req, res, next) => {
          req.csrfToken = () => {};
          next();
        };
      },
      './middleware/session': (req, res, next) => {
        req.session = session;
        next();
      }
    });

    return app;
  }
};
