const {
  bool,
  port,
  cleanEnv,
  str,
} = require('envalid');

module.exports = cleanEnv(process.env, {
  APP_URL: str({ desc: 'The user-facing, application URL.' }),
  DB_NAME: str({ desc: 'The primary database nane', default: 'smoketrax' }),
  EMAIL_FROM: str({ desc: 'The from name to use when sending notification emails.', default: 'SmokeTrax <support@smoketrax.io>' }),
  HOST: str({ desc: 'The host that the service will run on.', default: '0.0.0.0' }),
  MONGO_URI: str({ desc: 'The MongoDB instance to connect to.' }),
  PORT: port({ desc: 'The port that the service will run on.', default: 80 }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: str({ desc: 'The license key for New Relic.', default: '' }),
  SENDGRID_API_KEY: str({ desc: 'The Sendgrid API key for sending email.' }),
  TOKEN_SECRET: str({ desc: 'The secret for signing JWTs' }),
});
