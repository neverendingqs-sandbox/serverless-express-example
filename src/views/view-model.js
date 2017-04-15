const index = function(req, data) {
  return {
    csrfToken: req.csrfToken(),
    data: data
  };
};

module.exports = {
  index: index
};
