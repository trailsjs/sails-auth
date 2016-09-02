module.exports.routes = {
  'post /register': 'UserController.create',
  'post /logout': 'AuthController.logout',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'post /auth/:provider': 'AuthController.callback',
  'post /auth/:provider/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback'
};
