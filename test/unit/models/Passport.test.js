var assert = require('assert');

describe('Passport Model', function () {

  describe('#beforeCreate()', function () {

    it ('should hash the password', function (done) {

      sails.models.passport.beforeCreate({ password: 'password' }, function (err, passport) {

        assert.notEqual(passport.password, 'password');
        done(err);

      });

    });

  });
});
