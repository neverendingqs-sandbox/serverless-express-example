if(process.env.NODE_ENV === 'production' && typeof process.env.SESSION_SECRET === 'undefined') {
  throw('Must provide process.env.SESSION_SECRET in production.');
}

const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')({ session: session });

const sessionOptions = {
  cookie: { maxAge: 7200000 },
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'VERY INSECURE SECRET'
};

if(process.env.AWS_DEFAULT_REGION) {
  sessionOptions.store = new DynamoDBStore({
    table: process.env.SESSIONS_TABLE
  });
}

module.exports = session(sessionOptions);
