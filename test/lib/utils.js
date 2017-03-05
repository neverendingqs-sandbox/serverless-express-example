'use strict';
const assert = require('chai').assert;

const utils = require('../../src/lib/utils');

describe('utils', () => {
  describe('getHostUri()', () => {
    const getHostUri = utils.getHostUri;

    it('gets URI when no special headers are present', (done) => {
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

    it('uses "x-forwarded-proto" if present', (done) => {
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

    it('sets stage if "x-apigateway-event" is present', (done) => {
      const stage = 'c5729a3c-3703-48c4-9e4d-2ef2adb6e12b';
      const req = {
        headers: {
          host: 'example.com',
          'x-apigateway-event': JSON.stringify({ requestContext: { stage: stage } }),
          'x-forwarded-proto': 'https'
        },
        protocol: 'http'
      };

      assert.equal(
        getHostUri(req),
        'https://example.com/' + stage
      );

      done();
    });
  });
});
