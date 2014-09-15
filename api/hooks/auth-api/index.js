var _ = require('lodash');

module.exports = function (sails) {

  return {
    configure: function () {
      var policies = sails.config.policies;
      var routes = sails.config.routes;
      policies['*'] = policies['*'] || [ ];

      policies['*'].push('passport');

      _.merge(routes, {
        'get /login': 'AuthController.login',
        'get /logout': 'AuthController.logout',
        'get /register': 'AuthController.register',

        'post /auth/local': 'AuthController.callback',
        'post /auth/local/:action': 'AuthController.callback',

        'get /auth/:provider': 'AuthController.provider',
        'get /auth/:provider/callback': 'AuthController.callback'
      });
    }
  };

};
