module.exports = require('sails-generate-entities')({
  module: 'sails-auth',
  id: 'auth-api',
  i18n: [
    'config/locales/en.json'
  ],
  statics: [
    'api/models/Passport.js',
    'api/models/User.js',
    'api/controllers/AuthController.js',
    'api/controllers/UserController.js',
    'api/services/protocols/index.js',
    'config/passport.js',
  ],
  classes: [
    'api/services/passport.js',
    'api/services/protocols/local.js',
    'api/services/protocols/oauth.js',
    'api/services/protocols/oauth2.js',
    'api/services/protocols/openid.js'
  ],
  functions: [
    'api/policies/passport.js'
  ]
});
