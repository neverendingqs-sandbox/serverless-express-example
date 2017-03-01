'use strict';
const path = require('path');

const express = require('express');
// causes 'serverless-plugin-include-dependencies' to include ejs
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');

const app = express();

app.use(require('./lib/session'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', function(req, res) {
  res.render('index', { sessionId: req.session.id });
});

app.get('/hello', function(req, res) {
  res.json({
    message: '/hello'
  });
});

module.exports = app;
module.exports.handler = require('./lib/serverless-handler')(app);
