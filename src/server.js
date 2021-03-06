'use strict';
const path = require('path');

const express = require('express');
const serverless = require('serverless-http');
// causes 'serverless-plugin-include-dependencies' to include ejs
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./middleware/session'));
app.use(csrf());

app.use('/', require('./routers/root'));
app.use(require('./middleware/error'));

module.exports = app;
module.exports.handler = serverless(app);
