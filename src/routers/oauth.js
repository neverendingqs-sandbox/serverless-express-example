'use strict';
const _ = require('lodash');
const express = require('express');
const router = express.Router();

const rand = require('csprng');
const request = require('superagent');

const getHostUri = require('../lib/utils').getHostUri;
const getRedirectUri = req => getHostUri(req)  + '/oauth/callback';
const viewModel = require('../views/view-model');

const pcoEndpoint = 'https://api.planningcenteronline.com';


router.post('/', (req, res) => {
  const state = rand(256, 36);

  const redirectUrl = pcoEndpoint + '/oauth/authorize'
    + '?response_type=code'
    + '&client_id=' + process.env.PCO_CLIENT_ID
    + '&redirect_uri=' + getRedirectUri(req)
    + '&scope=people'
    + '&state=' + state;

  req.session.state = state;
  res.redirect(redirectUrl);
});

router.get('/callback', (req, res) => {
  if(typeof req.session.state === 'undefined' || req.query.state !== req.session.state) {
    console.warn('Refusing to serve request due to missing or mis-matched state.');
    delete req.session.state;
    res.render('index', viewModel.index(req, null));
    return;
  }

  delete req.session.state;

  request
    .post(pcoEndpoint + '/oauth/token')
    .auth(process.env.PCO_CLIENT_ID, process.env.PCO_CLIENT_SECRET)
    .type('form')
    .send({
      grant_type: 'authorization_code',
      redirect_uri: getRedirectUri(req),
      code: req.query.code
    })
    .then(postResponse => {
      // All available values from the response: https://tools.ietf.org/html/rfc6749#section-5.1
      // TODO: do we want to save the refresh token as well?
      // TODO: we probably want to save the expiry of the access token for downstream logic
      req.session.access_token = postResponse.body.access_token;
      res.redirect(getHostUri(req) + '/schedule');
    })
    .catch(err => {
      console.error(_.get(err, 'response.body', err));
      res.render('index', viewModel.index(req, null));
    });
});

module.exports = router;
