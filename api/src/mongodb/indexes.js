module.exports = {
  'smoke-logs': [
    { 'user._id': 1, date: 1 },
  ],
  tokens: [
    { audience: 1, subject: 1 },
    [{ expiresAt: 1 }, { expireAfterSeconds: 0 }],
  ],
  'user-events': [
    { 'user._id': 1, action: 1 },
  ],
  users: [
    [{ email: 1 }, { unique: true, collation: { locale: 'en_US' } }],

    { updatedAt: 1, _id: 1 },
  ],
};
