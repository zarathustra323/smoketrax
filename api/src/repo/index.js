const client = require('../mongodb');
const { DB_NAME: dbName } = require('../env');

const SmokeLog = require('./smoke-log');
const Token = require('./token');
const User = require('./user');
const UserEvent = require('./user-event');

const token = new Token({ client, dbName });
const userEvent = new UserEvent({ client, dbName });

const user = new User({
  client,
  dbName,
  tokenRepo: token,
  userEventRepo: userEvent,
});

const smokeLog = new SmokeLog({
  client,
  dbName,
  userRepo: user,
});

module.exports = {
  smokeLog,
  token,
  user,
  userEvent,
};
