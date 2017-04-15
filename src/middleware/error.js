const viewModel = require('../views/view-model');

// https://expressjs.com/en/guide/error-handling.html
module.exports = function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  res.status(200).render('index', viewModel.index(req, null));
};
