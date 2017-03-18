const index = function(req, data) {
  return {
    csrfToken: req.csrfToken(),
    data: data
  };
};

const schedule = function(req, schedules) {
  if(!(schedules instanceof Array)) {
    throw new Error(`schedules should be of type array but is type ${typeof schedules}`);
  }
  return {
    csrfToken: req.csrfToken(),
    // TODO: validate schedule data looks right
    schedules: schedules
  };
};

module.exports = {
  index: index,
  schedule: schedule
};
