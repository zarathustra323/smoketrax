const { validateAsync } = require('@parameter1/joi/utils');
const { isFunction: isFn } = require('@parameter1/utils');
const Joi = require('../joi');
const PaginableRepo = require('./-paginable');
const TokenRepo = require('./token');
const UserEventRepo = require('./user-event');
const createSchema = require('../schema/user/create');
const fields = require('../schema/user/fields');
const userEventFields = require('../schema/user-event/fields');

class UserRepo extends PaginableRepo {
  /**
   *
   */
  constructor({
    client,
    dbName,
    tokenRepo,
    userEventRepo,
  } = {}) {
    super({
      name: 'user',
      collectionName: 'users',
      dbName,
      client,
      collatableFields: ['email'],
    });
    if (!(tokenRepo instanceof TokenRepo)) throw new Error('The `tokenRepo` must be an instance of TokenRepo');
    if (!(userEventRepo instanceof UserEventRepo)) throw new Error('The `userEventRepo` must be an instance of UserEventRepo');
    this.tokenRepo = tokenRepo;
    this.userEventRepo = userEventRepo;
  }

  /**
   * @param {object} params
   * @param {string} params.email
   * @param {string} [params.givenName]
   * @param {string} [params.familyName]
   * @param {object} [params.options]
   */
  async create(params = {}) {
    const { payload, options } = await validateAsync(Joi.object({
      payload: createSchema.required(),
      options: Joi.object().default({}),
    }).required(), params);
    const { email, givenName, familyName } = payload;
    return super.insertOne({
      doc: {
        email,
        givenName,
        familyName,
      },
      options: { ...options, withDates: true },
    });
  }

  /**
   *
   * @param {object} params
   * @param {string} params.email
   * @param {string} [params.ip]
   * @param {string} [params.ua]
   * @param {string} [params.ttl=3600]
   * @param {string} [params.scope]
   * @param {object} [params.options]
   */
  async createLoginLinkToken(params = {}) {
    const {
      email,
      ip,
      ua,
      ttl,
      scope,
      inTransaction,
      options,
    } = await validateAsync(Joi.object({
      email: fields.email.required(),
      ip: userEventFields.ip,
      ua: userEventFields.ua,
      ttl: Joi.number().min(0).default(3600),
      scope: Joi.string(),
      inTransaction: Joi.function(),
      options: Joi.object().default({}),
    }).required(), params);

    const session = await this.client.startSession();

    let signed;
    await session.withTransaction(async () => {
      const user = await this.findByEmail({
        email,
        options: { ...options, strict: true, projection: { email: 1 } },
      });
      const payload = {
        subject: 'login-link',
        audience: user._id,
        ttl,
        ...(scope && { data: { scope } }),
      };
      const token = await this.tokenRepo.create({ payload, options: { session } });
      signed = token.signed;
      const { doc } = signed;
      await this.userEventRepo.create({
        payload: {
          userId: user._id,
          action: 'send-login-link',
          ip,
          ua,
          data: { scope, loginToken: { doc, value: signed } },
        },
        options: { session },
      });
      if (isFn(inTransaction)) await inTransaction({ user, token });
    });
    session.endSession();
    return signed;
  }
}

module.exports = UserRepo;
