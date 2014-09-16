/** @module User */
module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
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
