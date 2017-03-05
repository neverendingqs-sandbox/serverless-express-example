'use strict';
const path = require('path');
const viewModel = require('./views/view-model');

const express = require('express');
// causes 'serverless-plugin-include-dependencies' to include ejs
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./lib/session'));
app.use(csrf());

app.get('/', (req, res) => res.render('index', viewModel.index(req, req.session.id)));
app.use('/oauth', require('./routers/oauth'));
// TODO: middleware to check if a valid access token is available
app.use('/schedule', require('./routers/schedule'));

module.exports = app;
module.exports.handler = require('./lib/serverless-handler')(app);
