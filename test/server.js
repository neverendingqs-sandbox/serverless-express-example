const request = require('supertest');
const app = require('../src/server');

describe('routes are loaded successfully', function() {
  it('GET /', function() {
    request(app)
      .get('/')
      .expect(200);
  });
});
