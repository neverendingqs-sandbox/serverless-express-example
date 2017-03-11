const assert = require('chai').assert;
const request = require('supertest');

const app = require('../src/server');

describe('GET /', function() {
  it('returns main page', function() {
    request(app)
      .get('/')
      .expect(200)
      .then(res => assert.include(res.text, 'Swapper'));
  });
});
