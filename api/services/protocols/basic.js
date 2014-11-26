var localProtocol = require('./local');

module.exports = function (req, username, password, next) {
  sails.log('using basic auth strategy for user', username, ', password', password);

  return localProtocol.login(req, username, password, next);
};
