'use strict';
const assert = require('chai').assert;

const utils = require('../../src/lib/utils');

describe('utils', function() {
  describe('getHostUri()', function() {
    const getHostUri = utils.getHostUri;

    it('gets URI when no special headers are present', function() {
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
    });

    it('uses "x-forwarded-proto" if present', function() {
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
    });
  });
});
