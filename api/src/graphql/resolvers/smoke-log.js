const { typeProjection } = require('@parameter1/graphql-directive-project/utils');

module.exports = {
  /**
   *
   */
  SmokeLogEntry: {
    /**
     *
     */
    user({ user }, _, { repos }, info) {
      const projection = typeProjection(info);
      const localFields = ['_id', 'email'];
      const needsQuery = Object.keys(projection).some((field) => !localFields.includes(field));
      if (!needsQuery) return user;
      return repos.user.findByObjectId({ id: user._id });
    },
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    addSmokeLogEntry(_, __, {
      auth,
      repos,
      ip,
      ua,
    }) {
      const userId = auth.getUserId();
      return repos.smokeLog.create({ userId, ip, ua });
    },
  },
};
