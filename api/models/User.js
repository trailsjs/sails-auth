/** @module User */
module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    email: {
      type: 'email',
      notNull: true,
      unique: true
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    }
  }
};
