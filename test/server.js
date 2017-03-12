const request = require('supertest');
const app = require('../src/server');

describe('routes are loaded successfully', function() {
  it('GET /', function() {
    request(app)
      .get('/')
      .expect(200);
  });

  it('GET /callback', function() {
    request(app)
      .get('/oauth/callback')
      .expect(200);
  });

  it('GET /schedule', function() {
    request(app)
      .get('/schedule')
      .expect(200);
  });
});
