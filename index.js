module.exports = require('sails-generate-entities')({
  module: 'sails-auth',
  id: 'auth-api',
  statics: [
    'api/models/Passport.js',
    'api/models/User.js',
    'api/controllers/AuthController.js',
    'api/services/protocols/index.js',
    'config/passport.js'
  ],
  classes: [
    'api/policies/passport.js',
    'api/services/passport.js',
    'api/services/protocols/local.js',
    'api/services/protocols/oauth.js',
    'api/services/protocols/oauth2.js',
    'api/services/protocols/openid.js'
  ]
});
