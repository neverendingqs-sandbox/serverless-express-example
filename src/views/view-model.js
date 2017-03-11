const index = function(req, data) {
  return {
    csrfToken: req.csrfToken(),
    data: data
  };
};

const schedule = function(req, data) {
  return {
    csrfToken: req.csrfToken(),
    data: data
  };
};

module.exports = {
  index: index,
  schedule: schedule
};
