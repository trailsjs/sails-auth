/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * Authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  basic: {
    strategy: require('passport-http').BasicStrategy,
    protocol: 'basic'
  },

  /*
  bearer: {
    strategy: require('passport-http-bearer').Strategy,
    protocol: 'bearer'
  },
  google: {
    name: 'Google',
    protocol: 'oauth2',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      scope: ['profile', 'email']
    }
  }

  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: 'your-consumer-key',
      consumerSecret: 'your-consumer-secret'
    }
  },

  github: {
    name: 'GitHub',
    protocol: 'oauth2',
    strategy: require('passport-github').Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
    }
  },

  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
    }
  }

  youtube: {
    name: 'Youtube',
    protocol: 'oauth2',
    strategy: require('passport-youtube').Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
    },
  },

  'youtube-v3': {
    name: 'Youtube',
    protocol: 'oauth2',
    strategy: require('passport-youtube-v3').Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
      // Scope: see https://developers.google.com/youtube/v3/guides/authentication
      scope: [ 'https://www.googleapis.com/auth/youtube.readonly' ],
    },
  },

  */

};
