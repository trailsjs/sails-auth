var _ = require('lodash');

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
  },

  /**
   * Set username if only email is set
   */
  afterValidate: function (user, next) {
    if (_.isEmpty(user.username) && !_.isEmpty(user.email)) {
      user.username = user.email;
    }

    next();
  }
};
