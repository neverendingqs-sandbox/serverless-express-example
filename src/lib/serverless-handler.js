const awsServerlessExpress = require('aws-serverless-express');

module.exports = app => {
  const server = awsServerlessExpress.createServer(app);
  return (event, context) => awsServerlessExpress.proxy(server, event, context);
};
