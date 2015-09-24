var path = require('path');
var url = require('url');
var passport = require('passport');
var _ = require('lodash');

/**
 * Passport Service
 *
 * A painless Passport.js service for your Sails app that is guaranteed to
 * Rock Your Socks. It takes all the hassle out of setting up Passport.js by
 * encapsulating all the boring stuff in two functions:
 *
 *   passport.endpoint()
 *   passport.callback()
 *
 * The former sets up an endpoint (/auth/:provider) for redirecting a user to a
 * third-party provider for authentication, while the latter sets up a callback
 * endpoint (/auth/:provider/callback) for receiving the response from the
 * third-party provider. All you have to do is define in the configuration which
 * third-party providers you'd like to support. It's that easy!
 *
 * Behind the scenes, the service stores all the data it needs within "Pass-
 * ports". These contain all the information required to associate a local user
 * with a profile from a third-party provider. This even holds true for the good
 * ol' password authentication scheme – the Authentication Service takes care of
 * encrypting passwords and storing them in Passports, allowing you to keep your
 * User model free of bloat.
 */

// Load authentication protocols
passport.protocols = require('./protocols');

/**
 * Connect a third-party profile to a local user
 *
 * This is where most of the magic happens when a user is authenticating with a
 * third-party provider. What it does, is the following:
 *
 *   1. Given a provider and an identifier, find a mathcing Passport.
 *   2. From here, the logic branches into two paths.
 *
 *     - A user is not currently logged in:
 *       1. If a Passport wassn't found, create a new user as well as a new
 *          Passport that will be assigned to the user.
 *       2. If a Passport was found, get the user associated with the passport.
 *
 *     - A user is currently logged in:
 *       1. If a Passport wasn't found, create a new Passport and associate it
 *          with the already logged in user (ie. "Connect")
 *       2. If a Passport was found, nothing needs to happen.
 *
 * As you can see, this function handles both "authentication" and "authori-
 * zation" at the same time. This is due to the fact that we pass in
 * `passReqToCallback: true` when loading the strategies, allowing us to look
 * for an existing session in the request and taking action based on that.
 *
 * For more information on auth(entication|rization) in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 * http://passportjs.org/guide/authorize/
 *
 * @param {Object}   req
 * @param {Object}   query
 * @param {Object}   profile
 * @param {Function} next
 */
passport.connect = function (req, query, profile, next) {
  var user = { };

  req.session.tokens = query.tokens;

  // Get the authentication provider from the query.
  query.provider = req.param('provider');

  // Use profile.provider or fallback to the query.provider if it is undefined
  // as is the case for OpenID, for example
  var provider = profile.provider || query.provider;

  // If the provider cannot be identified we cannot match it to a passport so
  // throw an error and let whoever's next in line take care of it.
  if (!provider){
    return next(new Error('No authentication provider was identified.'));
  }

  sails.log.debug('auth profile', profile);

  // If the profile object contains a list of emails, grab the first one and
  // add it to the user.
  if (profile.emails && profile.emails[0]) {
    user.email = profile.emails[0].value;
  }
  // If the profile object contains a username, add it to the user.
  if (_.has(profile, 'username')) {
    user.username = profile.username;
  }

  // If neither an email or a username was available in the profile, we don't
  // have a way of identifying the user in the future. Throw an error and let
  // whoever's next in the line take care of it.
  if (!user.username && !user.email) {
    return next(new Error('Neither a username nor email was available'));
  }

  sails.models.passport.findOne({
      provider: provider,
      identifier: query.identifier.toString()
    })
    .then(function (passport) {
      if (!req.user) {
        // Scenario: A new user is attempting to sign up using a third-party
        //           authentication provider.
        // Action:   Create a new user and assign them a passport.
        if (!passport) {
          return sails.models.user.create(user)
            .then(function (_user) {
              user = _user;
              return sails.models.passport.create(_.extend({ user: user.id }, query))
            })
            .then(function (passport) {
              next(null, user);
            })
            .catch(next);
            
        }
        // Scenario: An existing user is trying to log in using an already
        //           connected passport.
        // Action:   Get the user associated with the passport.
        else {
          // If the tokens have changed since the last session, update them
          if (_.has(query, 'tokens') && query.tokens != passport.tokens) {
            passport.tokens = query.tokens;
          }

          // Save any updates to the Passport before moving on
          return passport.save()
            .then(function (passport) {

              // Fetch the user associated with the Passport
              return sails.models.user.findOne(passport.user.id);
            })
            .then(function (user) {
              next(null, user);
            })
            .catch(next);
        }
      }
      else {
        // Scenario: A user is currently logged in and trying to connect a new
        //           passport.
        // Action:   Create and assign a new passport to the user.
        if (!passport) {
          return sails.models.passport.create(_.extend({ user: req.user.id }, query))
            .then(function (passport) {
              next(null, req.user);
            })
            .catch(next);
        }
        // Scenario: The user is a nutjob or spammed the back-button.
        // Action:   Simply pass along the already established session.
        else {
          next(null, req.user);
        }
      }
    })
    .catch(next)
};

/**
 * Create an authentication endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param  {Object} req
 * @param  {Object} res
 */
passport.endpoint = function (req, res) {
  var strategies = sails.config.passport;
  var provider = req.param('provider');
  var options = { };

  // If a provider doesn't exist for this endpoint, send the user back to the
  // login page
  if (!_.has(strategies, provider)) {
    return res.redirect('/login');
  }

  // Attach scope if it has been set in the config
  if (_.has(strategies[provider], 'scope')) {
    options.scope = strategies[provider].scope;
  }

  // Redirect the user to the provider for authentication. When complete,
  // the provider will redirect the user back to the application at
  //     /auth/:provider/callback
  this.authenticate(provider, options)(req, res, req.next);
};

/**
 * Create an authentication callback endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
passport.callback = function (req, res, next) {
  var provider = req.param('provider', 'local');
  var action = req.param('action');

  // Passport.js wasn't really built for local user registration, but it's nice
  // having it tied into everything else.
  if (provider === 'local' && action !== undefined) {
    if (action === 'register' && !req.user) {
      this.protocols.local.register(req, res, next);
    }
    else if (action === 'connect' && req.user) {
      this.protocols.local.connect(req, res, next);
    }
    else if (action === 'disconnect' && req.user) {
      this.protocols.local.disconnect(req, res, next);
    }    
    else {
      next(new Error('Invalid action'));
    }
  }
  else {
    if (action === 'disconnect' && req.user) {
      this.disconnect(req, res, next) ;
    }
    else {
      // The provider will redirect the user to this URL after approval. Finish
      // the authentication process by attempting to obtain an access token. If
      // access was granted, the user will be logged in. Otherwise, authentication
      // has failed.
      this.authenticate(provider, next)(req, res, req.next);
    }
  }
};

/**
 * Load all strategies defined in the Passport configuration
 *
 * For example, we could add this to our config to use the GitHub strategy
 * with permission to access a users email address (even if it's marked as
 * private) as well as permission to add and update a user's Gists:
 *
    github: {
      name: 'GitHub',
      protocol: 'oauth2',
      scope: [ 'user', 'gist' ]
      options: {
        clientID: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET'
      }
    }
 *
 * For more information on the providers supported by Passport.js, check out:
 * http://passportjs.org/guide/providers/
 *
 */
passport.loadStrategies = function () {
  var strategies = sails.config.passport;

  _.each(strategies, function (strategy, key) {
    var options = { passReqToCallback: true };
    var Strategy;

    if (key === 'local') {
      // Since we need to allow users to login using both usernames as well as
      // emails, we'll set the username field to something more generic.
      _.extend(options, { usernameField: 'identifier' });

      // Only load the local strategy if it's enabled in the config
      if (strategies.local) {
        Strategy = strategies[key].strategy;

        passport.use(new Strategy(options, this.protocols.local.login));
      }
    }
    else {
      var protocol = strategies[key].protocol;
      var callback = strategies[key].callback;

      if (!callback) {
        callback = path.join('auth', key, 'callback');
      }

      Strategy = strategies[key].strategy;

      var baseUrl = sails.getBaseurl();

      switch (protocol) {
        case 'oauth':
        case 'oauth2':
          options.callbackURL = url.resolve(baseUrl, callback);
          break;

        case 'openid':
          options.returnURL = url.resolve(baseUrl, callback);
          options.realm     = baseUrl;
          options.profile   = true;
          break;
      }

      // Merge the default options with any options defined in the config. All
      // defaults can be overriden, but I don't see a reason why you'd want to
      // do that.
      _.extend(options, strategies[key].options);

      passport.use(new Strategy(options, this.protocols[protocol]));
    }
  }, this);
};

/**
 * Disconnect a passport from a user
 *
 * @param  {Object} req
 * @param  {Object} res
 */
passport.disconnect = function (req, res, next) {
  var user = req.user;
  var provider = req.param('provider');

  return sails.models.passport.findOne({
      provider: provider,
      user: user.id
    })
    .then(function (passport) {
      return sails.models.passport.destroy(passport.id)
    })
    .then(function (error) {
      next(null, user);
      return user
    })
    .catch(next)
};

passport.serializeUser(function (user, next) {
  next(null, user.id);
});

passport.deserializeUser(function (id, next) {
  return sails.models.user.findOne(id)
    .then(function (user) {
      next(null, user || null);
      return user;
    })
    .catch(next)

});

module.exports = passport;
