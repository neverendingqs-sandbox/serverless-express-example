require('dotenv').config();

const https = require('https');
const selfSigned = require('openssl-self-signed-certificate');

const app = require('./src/server');
const port = (process.env.PORT || 3001);

const options = {
  key: selfSigned.key,
  cert: selfSigned.cert
};

https.createServer(options, app).listen(port);

// eslint-disable-next-line no-console
console.log(`HTTPS started on port ${port} (dev only).`);
