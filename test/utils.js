'use strict';
const assert = require('chai').assert;
const express = require('express');
const path = require('path');

module.exports = {
  createAppForTesting: (session) => {
    assert.isObject(session);

    let app = express();
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../src/views'));
    app.use((req, res, next) => {
      req.session = session;
      req.csrfToken = () => 'csrfToken';
      next();
    });

    return app;
  }
};
