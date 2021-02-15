const { validateAsync } = require('@parameter1/joi/utils');
const Joi = require('../joi');
const PaginableRepo = require('./-paginable');
const UserRepo = require('./user');
const fields = require('../schema/smoke-log/fields');
const userFields = require('../schema/user/fields');

class SmokeLogRepo extends PaginableRepo {
  /**
   *
   */
  constructor({
    client,
    dbName,
    userRepo,
  } = {}) {
    super({
      name: 'smoke-log',
      collectionName: 'smoke-logs',
      dbName,
      client,
    });
    if (!(userRepo instanceof UserRepo)) throw new Error('The `userRepo` must be an instance of UserRepo');
    this.userRepo = userRepo;
  }

  /**
   * @param {object} params
   * @param {string} params.userId
   */
  async create(params = {}) {
    const {
      userId,
      ip,
      ua,
      options,
    } = await validateAsync(Joi.object({
      userId: userFields.id.required(),
      ip: fields.ip,
      ua: fields.ua,
      options: Joi.object().default({}),
    }).required(), params);

    const user = await this.userRepo.findByObjectId({
      id: userId,
      options: { strict: true, projection: { email: 1 } },
    });

    return this.insertOne({
      doc: {
        user,
        date: new Date(),
        ip,
        ua,
      },
      options: { ...options, withDates: false },
    });
  }
}

module.exports = SmokeLogRepo;
