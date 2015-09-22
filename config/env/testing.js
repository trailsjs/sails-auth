/**
 * Testing environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  log: { level: 'debug' },
  models: {
    connection: 'testing',
    migrate: 'drop'
  },
  connections: {
    testing: {
      adapter: 'waterline-sqlite3',
      type: 'memory'
    }
  },
  hooks: {
    grunt: false,
    views: false
  },
  policies: {
    '*': ['basicAuth', 'passport', 'sessionAuth'],
    AuthController: { '*': [ 'passport' ] },
    UserController: { create: true }
  },
  port: 1448
};
