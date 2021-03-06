if(process.env.NODE_ENV === 'production' && typeof process.env.SESSION_SECRET === 'undefined') {
  throw('Must provide process.env.SESSION_SECRET in production.');
}

const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')({ session: session });

const twoHoursInMs = 7200000;

const sessionOptions = {
  cookie: { maxAge: twoHoursInMs },
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'VERY INSECURE SECRET'
};

if(process.env.SESSIONS_TABLE) {
  sessionOptions.store = new DynamoDBStore({
    reapInterval: twoHoursInMs,
    table: process.env.SESSIONS_TABLE
  });
}

module.exports = session(sessionOptions);
