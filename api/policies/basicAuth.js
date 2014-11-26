var localProtocol = require('../services/protocols/local');
/**
 * basicAuth
 *
 * If HTTP Basic Auth credentials are present in the headers, then authenticate the
 * user for a single request.
 */
module.exports = function (req, res, next) {
  var auth = req.headers.authorization;
  if (!auth || auth.search('Basic ') !== 0) {
    return next();
  }
  if (process.env.NODE_ENV !== 'development' && !req.secure) {
    return res.json({ error: 'https required for basic auth. refusing login request' }, 403);
  }

  var authString = new Buffer(auth.split(' ')[1], 'base64').toString();
  var username = authString.split(':')[0];
  var password = authString.split(':')[1];

  sails.log('authenticating', username, 'using basic auth for a single reqest:', req.url);

  localProtocol.login(req, username, password, function (error, user, passport) {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.json({ error: 'Could not authenticate user '+ username }, 403);
    }

    req.user = user;
    req.session.passport = passport;

    next();
  });
};
