'use strict';
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const request = require('superagent');

const viewModel = require('../views/view-model');
const pcoEndpoint = 'https://api.planningcenteronline.com';

router.get('/', (req, res) => {
  request
    .get(pcoEndpoint + '/people/v2/me')
    // TODO: redirect user to login page to get a new token OR consider storing refresh tokens
    .set('Authorization', 'Bearer ' + req.session.access_token)
    .then(getResponse => {
      // TODO: new view that shows the schedule
      const data = _.get(getResponse.body, 'data.attributes.first_name', JSON.stringify(getResponse.body));
      res.render('index', viewModel.index(req, data));
    })
    .catch(err => {
      console.error(_.get(err, 'response.body', err));
      res.render('index', viewModel.index(req, null));
    });
});

module.exports = router;
