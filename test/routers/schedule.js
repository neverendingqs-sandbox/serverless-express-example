'use strict';
const assert = require('chai').assert;
const nock = require('nock');
const request = require('supertest');

const utils = require('../utils');
const pcoEndpoint = 'https://api.planningcenteronline.com';

var app;
var session = {};

beforeEach(function() {
  app = utils.createAppForTesting(session);
});

afterEach(function() {
  if(!nock.isDone()) {
    this.test.error(new Error('Not all nock interceptors were used!'));
    nock.cleanAll();
  }
  session = {};
});

describe('GET /schedule', function() {
  it('calls whoami and schedule', function() {
    const userId = 'f4369141-665e-432a-ad76-3a08a296db4e';
    // TODO: update validation to show converted values (e.g. human readable date)
    const scheduleId = '9da9a2e1-111f-410b-a134-c054ba5f9c55';
    const scheduleData = [{
      id: scheduleId,
      attributes: {
        team_name: 'team_name',
        team_position_name: 'team_position_name',
        sort_date: 'sort_date'
      }
    }];
    session.access_token = 'cd22f988-afe4-47eb-9025-afaf313487c8';

    nock(pcoEndpoint)
      .get('/people/v2/me')
      .matchHeader('Authorization', val => val === 'Bearer ' + session.access_token)
      .reply(200, { data: { id: userId } });

    nock(pcoEndpoint)
      .get(`/services/v2/people/${userId}/schedules`)
      .matchHeader('Authorization', val => val === 'Bearer ' + session.access_token)
      .reply(200, { data: scheduleData });

    return request(app)
      .get('/schedule')
      .expect(200)
      .then(res => assert.include(res.text, scheduleId));
  });
});
