const request = require('supertest');
const app = require('../src/server');

describe('routes are loaded successfully', function() {
  it('GET /', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
