'use strict';
const _ = require('lodash');

module.exports = {
  getRedirectUri: (req) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;

    let stage = '';
    if(req.headers['x-apigateway-event']) {
      const event = JSON.parse(req.headers['x-apigateway-event']);
      stage = '/' + _.get(event, 'requestContext.stage');
    }

    return protocol + '://' + req.headers.host + stage + '/oauth/callback';
  }
};
