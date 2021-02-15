const Joi = require('../../joi');

module.exports = {
  date: Joi.date(),
  ip: Joi.string().allow('', null),
  ua: Joi.string().allow('', null),
};
