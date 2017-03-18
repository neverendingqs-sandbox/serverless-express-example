'use strict';
const assert = require('chai').assert;

const utils = require('../../src/views/view-model');

describe('view-model', function() {
  const csrfToken = '549ce811-4a09-45d8-be5b-9a823172ab59';

  describe('schedule()', function() {
    const schedule = utils.schedule;

    [{}, 'string'].forEach(invalidInput => {
      it(`rejects on non-array input of type '${typeof invalidInput}'`, function() {
        const req = {
          csrfToken: () => csrfToken
        };

        assert.throws(
          () => schedule(req, invalidInput),
          new RegExp(typeof invalidInput)
        );
      });
    });
  });
});
