module.exports = require('sails-generate-entities')({
  module: 'sails-auth',
  id: 'auth-api',
  entities: [
    'api/controllers/AuthController.js',
    'api/models/Passport.js',
    'api/models/User.js',
    'api/policies/passport.js',
    'api/services/passport.js',
    'api/services/protocols/index.js',
    'api/services/protocols/local.js',
    'api/services/protocols/oauth.js',
    'api/services/protocols/oauth2.js',
    'api/services/protocols/openid.js'
  ]
});
