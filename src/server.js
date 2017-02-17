const express = require('express');
const serverless = require('serverless-http');

const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/hello', function(req, res) {
  res.json({
    message: '/hello'
  });
});

module.exports = app;
module.exports.handler = serverless(app);
