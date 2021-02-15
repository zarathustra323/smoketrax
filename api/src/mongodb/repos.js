const { Repo } = require('@parameter1/mongodb/repo');
const client = require('./client');

const repos = [
  { name: 'user', coll: 'users' },
];

module.exports = repos.reduce((o, { name, collectionName }) => {
  const repo = new Repo({
    name,
    client,
    collectionName,
    dbName: 'smoketrax',
  });
  return { ...o, [name]: repo };
}, {});
