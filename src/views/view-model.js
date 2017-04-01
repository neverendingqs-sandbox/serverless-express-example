const _ = require('lodash');

const index = function(req, data) {
  return {
    csrfToken: req.csrfToken(),
    data: data
  };
};

const schedule = function(req, scheduleResData) {
  if(!(scheduleResData instanceof Array)) {
    throw new Error(`schedules should be of type array but is type ${typeof scheduleResData}`);
  }

  const schedules = scheduleResData
    .map(datum => {
      // TODO: validate schedule data looks right
      return {
        id: datum.id,
        serviceType: _.get(datum, 'attributes.service_type_name'),
        team: _.get(datum, 'attributes.team_name'),
        position: _.get(datum, 'attributes.team_position_name'),
        // TODO: better datetime parsing
        date: _.get(datum, 'attributes.sort_date').replace('T', ' ').replace('Z', '')
      };
    });

  return {
    csrfToken: req.csrfToken(),
    schedules: schedules
  };
};

module.exports = {
  index: index,
  schedule: schedule
};
