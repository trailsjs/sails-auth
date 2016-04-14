/*
 * Bearer Authentication Protocol
 *
 * Bearer Authentication is for authorizing API requests. Once
 * a user is created, a token is also generated for that user
 * in its passport. This token can be used to authenticate
 * API requests.
 *
 */

module.exports = function(req, token, done) {

  sails.models.passport.findOne({ accessToken: token }).exec(function(err, passport) {
    if (err) {
      return done(err);
    }

    if (!passport) {
      return done(null, false);
    }

    sails.models.user.findOne({id: passport.user}).exec(function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      // delete access_token from params
      // to avoid conflicts with blueprints query builder
      delete req.query.access_token;
      return done(null, user, { scope: 'all' });
    });
  });

};
