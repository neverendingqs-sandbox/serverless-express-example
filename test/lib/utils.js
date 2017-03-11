'use strict';
const assert = require('chai').assert;

const utils = require('../../src/lib/utils');

describe('utils', () => {
  describe('getHostUri()', () => {
    const getHostUri = utils.getHostUri;

    it('gets URI when no special headers are present', function(done) {
      const req = {
        headers: {
          host: 'example.com'
        },
        protocol: 'http'
      };

      assert.equal(
        getHostUri(req),
        'http://example.com'
      );

      done();
    });

    it('uses "x-forwarded-proto" if present', function(done) {
      const req = {
        headers: {
          host: 'example.com',
          'x-forwarded-proto': 'https'
        },
        protocol: 'http'
      };

      assert.equal(
        getHostUri(req),
        'https://example.com'
      );

      done();
    });
  });
});
