const sendMail = require('../../send-email');
const { APP_URL, EMAIL_FROM } = require('../../env');

const sendLoginLink = async ({
  email,
  token,
  redirectTo,
} = {}) => {
  let url = `${APP_URL}/authenticate?token=${token}`;
  if (redirectTo) url = `${url}&next=${encodeURIComponent(redirectTo)}`;
  return sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Your personal login link',
    html: `
      <p>You requested to login.</p>
      <p><a href="${url}">Login</a></p>
    `,
    text: `
      You requested to login.
      Link: ${url}
    `,
  });
};

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

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    async registerUser(_, { input }, {
      repos,
      ip,
      ua,
    }) {
      const {
        email,
        givenName,
        familyName,
        redirectTo,
      } = input;
      const payload = { email, givenName, familyName };
      const user = await repos.user.create({ payload });
      await repos.user.createLoginLinkToken({
        email,
        ip,
        ua,
        inTransaction: async (data) => sendLoginLink({
          email: data.user.email,
          token: data.token.signed,
          redirectTo,
        }),
      });
      return user;
    },

    /**
     *
     */
    async sendUserLoginLink(_, { input }, {
      repos,
      ip,
      ua,
    }) {
      const { email, redirectTo } = input;
      await repos.user.createLoginLinkToken({
        email,
        ip,
        ua,
        inTransaction: async (data) => sendLoginLink({
          email: data.user.email,
          token: data.token.signed,
          redirectTo,
        }),
      });
      return 'ok';
    },
  },
};
