'use strict';
const assert = require('chai').assert;
const nock = require('nock');
const request = require('supertest');

const utils = require('../utils');
const schedule = require('../../src/routers/schedule');

var app;
var session = {};

beforeEach(function() {
  app = utils.createAppForTesting(session);
  app.use('/schedule', schedule);
});

afterEach(function() {
  if(!nock.isDone()) {
    this.test.error(new Error('Not all nock interceptors were used!'));
  }
  session = {};
});

describe('GET /schedule', function() {
  // TODO: update to get schedule instead
  it('calls whoami', function() {
    const firstName = 'f4369141-665e-432a-ad76-3a08a296db4e';
    session.access_token = 'cd22f988-afe4-47eb-9025-afaf313487c8';

    nock('https://api.planningcenteronline.com')
      .get('/people/v2/me')
      .matchHeader('Authorization', val => val === 'Bearer ' + session.access_token)
      .reply(200, { data: { attributes: { first_name: firstName } } });

    return request(app)
      .get('/schedule')
      .expect(200)
      .then(res => assert.include(res.text, firstName));
  });
});
