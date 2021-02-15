module.exports = {
  /**
   *
   */
  User: {
    /**
     *
     */
    loginCount(user) {
      return user.loginCount || 0;
    },

    /**
     *
     */
    verified(user) {
      return user.verified || false;
    },
  },
};
