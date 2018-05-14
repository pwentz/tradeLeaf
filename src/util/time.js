const moment = require('moment');

export const dayOfWeek = (date) => {
  switch (moment(date).day()) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
};

export const daysAgo = (date, metric) => {
  return moment(new Date()).diff(moment(date), metric);
};

export const fromNow = (date) => moment(date).fromNow();

export const format = (date, formatting) => momen(date).format(formatting);
