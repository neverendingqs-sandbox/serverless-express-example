'use strict';
const assert = require('chai').assert;
const nock = require('nock');
const path = require('path');
const request = require('supertest');

const utils = require('../utils');
const oauth = require('../../src/routers/oauth');

var app;
var session = {};

before(function() {
  require('dotenv').config({ path: path.join(__dirname, '../.test-env') });
});

beforeEach(function() {
  app = utils.createAppForTesting(session);
  app.use('/oauth', oauth);
});

afterEach(function() {
  if(!nock.isDone()) {
    this.test.error(new Error('Not all nock interceptors were used!'));
    nock.cleanAll();
  }
  session = {};
});

describe('POST /oauth', function() {
  it('redirects to PCO', function() {
    return request(app)
      .post('/oauth')
      .expect(302)
      .then(res => {
        assert.include(res.header.location, 'https://api.planningcenteronline.com/oauth/authorize');
        assert.include(res.header.location, 'response_type=code');
        assert.include(res.header.location, '&client_id=' + process.env.PCO_CLIENT_ID);
        assert.match(res.header.location, /&redirect_uri=.+/);
        assert.include(res.header.location, '&scope=people');
        assert.match(res.header.location, /&state=.+/);
      });
  });
});

describe('GET /oauth/callback', function() {
  it('error if session has no state', function() {
    return request(app)
      .get('/oauth/callback?state=randomquerystate')
      .expect(200)
      .then(res => assert.include(res.text, 'error'));
  });

  it('error if query has no state', function() {
    session.state = 'randomsessionstate';
    return request(app)
      .get('/oauth/callback')
      .expect(200)
      .then(res => {
        assert.include(res.text, 'error');
        assert.isUndefined(session.state);
      });
  });

  describe('calls PCO for access token', function() {
    it('stores token response into session and redirects to /schedule', function() {
      const access_token = '264800d0-b36c-4a3e-b410-59936cd48f30';
      const code = '2214a338-9f85-418b-8cda-fff16c16d119';
      const state = 'd4b7c779-b622-4b59-a8ef-4412f0dd12a0';

      nock('https://api.planningcenteronline.com')
        .post('/oauth/token', body => {
          return body.includes('grant_type=authorization_code')
            && body.match(/redirect_uri=.+/)
            && body.includes('code=' + code);
        })
        .basicAuth({
          user: process.env.PCO_CLIENT_ID,
          pass: process.env.PCO_CLIENT_SECRET
        })
        .reply(200, { access_token: access_token });

      session.state = state;
      const endpoint = '/oauth/callback'
        + '?code=' + code
        + '&state=' + state;
      return request(app)
        .get(endpoint)
        .expect(302)
        .then(res => {
          assert.isUndefined(session.state);
          assert.equal(session.access_token, access_token);
          assert.include(res.header.location, '/schedule');
        });
    });

    [400, 401, 403].forEach(statusCode => {
      it('handles ' + statusCode + ' from PCO token endpoint gracefully', function() {
        const code = '2214a338-9f85-418b-8cda-fff16c16d119';
        const state = 'd4b7c779-b622-4b59-a8ef-4412f0dd12a0';

        nock('https://api.planningcenteronline.com')
          .post('/oauth/token', body => {
            return body.includes('grant_type=authorization_code')
              && body.match(/redirect_uri=.+/)
              && body.includes('code=' + code);
          })
          .basicAuth({
            user: process.env.PCO_CLIENT_ID,
            pass: process.env.PCO_CLIENT_SECRET
          })
          .reply(statusCode, { error: 'An error has occurred.' });

        session.state = state;
        const endpoint = '/oauth/callback'
          + '?code=' + code
          + '&state=' + state;
        return request(app)
          .get(endpoint)
          .expect(200)
          .then(res => {
            assert.include(res.text, 'error');
            assert.isUndefined(session.state);
          });
      });
    });
  });
});
