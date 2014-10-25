var _ = require('lodash');

module.exports = function (sails) {
  return {
    configure: function () {
      ///configurePolicies(sails);
      configureRoutes(sails);
      //configureHttp(sails);

      sails.services.passport.loadStrategies();
    }
  };

};

function configurePolicies (sails) {
  // XXX there's probably a cleaner way to do this...
  var policies = sails.config.policies;
  policies['*'] = policies['*'] || [ ];

  if (policies['*'] === true) {
    policies['*'] = [ ];
  }
  if (!_.contains(policies['*'], 'passport')) {
    policies['*'].push('passport');
  }

}
function configureRoutes (sails) {
  _.merge(sails.config.routes, {
    'get /login': 'AuthController.login',
    'get /logout': 'AuthController.logout',
    'get /register': 'AuthController.register',

    'post /auth/local': 'AuthController.callback',
    'post /auth/local/:action': 'AuthController.callback',

    'get /auth/:provider': 'AuthController.provider',
    'get /auth/:provider/callback': 'AuthController.callback',
    'get /auth/:provider/:action': 'AuthController.callback'
  });
}
function configureHttp (sails) {
  _.merge(sails.config.http, {
    middleware: {
      passportInit: require('passport').initialize(),
      passportSession: require('passport').session()
    }
  });

  // insert passportInit and passportSession middleware immediately after the
  // session middleware
  var sessionIndex = _.indexOf(sails.config.http.middleware.order, 'session');
  sails.config.http.middleware.order.splice(sessionIndex + 1, 0, 'passportInit');
  sails.config.http.middleware.order.splice(sessionIndex + 2, 0, 'passportSession');
}
