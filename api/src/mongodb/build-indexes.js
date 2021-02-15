const mongodb = require('./index');
const indexes = require('./indexes');
const { DB_NAME } = require('../env');

module.exports = () => mongodb
  .buildIndexesFor({ dbName: DB_NAME, obj: indexes, forceBackground: true });
