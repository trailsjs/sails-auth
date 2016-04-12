/*
 * Bearer Authentication Protocol
 *
 * Bearer Authentication is for authorizing API requests. Once
 * a user is created, a token is also generated for that user
 * in its passport. This token can be used to authenticate
 * API requests.
 *
 */

module.exports = function(token, done) {

  sails.models.passport.findOne({ accessToken: token }, function(err, passport) {
    if (err) {
      return done(err);
    }

    if (!passport) {
      return done(null, false);
    }

    sails.models.user.findOneById(passport.user, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      return done(null, user, { scope: 'all' });
    });
  });

};
