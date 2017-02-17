const assert = require('chai').assert;
const request = require('supertest');

const app = require('../src/server');

describe('/', function() {
  it('returns /', function() {
    request(app)
      .get('/')
      .expect(200)
      .then(res => assert.include(res.text, '<h1>Hello World</h1>'));
  });

  it('returns /hello', function() {
    request(app)
      .get('/hello')
      .expect(200)
      .then(res => assert.equal(res.body.message, '/hello'));
  });
});
