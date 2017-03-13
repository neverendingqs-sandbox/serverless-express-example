'use strict';
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const request = require('superagent');

const viewModel = require('../views/view-model');
const pcoEndpoint = 'https://api.planningcenteronline.com';

const requestGet = function(endpoint, accessToken) {
  return request
    .get(endpoint)
    // TODO: redirect user to login page to get a new token OR consider storing refresh tokens
    .set('Authorization', `Bearer ${accessToken}`);
};

const extractUserId = function(body) {
  const userId = _.get(body, 'data.id', '');
  if(userId === '') {
    return Promise.reject('Could not find user ID.');
  }

  return Promise.resolve(userId);
};

router.get('/', (req, res, next) => {
  requestGet(`${pcoEndpoint}/people/v2/me`, req.session.access_token)
    .then(peopleRes => extractUserId(peopleRes.body))
    .then(userId => requestGet(`${pcoEndpoint}/services/v2/people/${userId}/schedules`, req.session.access_token))
    .then(scheduleRes => res.render('schedule', viewModel.schedule(req, JSON.stringify(scheduleRes.body))))
    .catch(next);
});

module.exports = router;
