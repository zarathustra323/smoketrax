const http = require('http');
const express = require('express');
const helmet = require('helmet');
const graphql = require('./graphql/server');

const service = express();
service.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

service.use(helmet({ contentSecurityPolicy: false }));

graphql({ app: service, path: '/' });

module.exports = http.createServer(service);
