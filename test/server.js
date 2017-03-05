const assert = require('chai').assert;
const request = require('supertest');

const app = require('../src/server');

describe('GET /', () => {
  it('returns main page', () => {
    request(app)
      .get('/')
      .expect(200)
      .then(res => assert.include(res.text, 'Swapper'));
  });
});
