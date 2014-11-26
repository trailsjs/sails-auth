module.exports = function (req, username, password, next) {
  sails.log('using basic auth strategy for user', username, ', password', password);
  User.findOne({ username: username })
    .populate('passports')
    .then(function (user) {
      if (!user) {
        return next(null, false);
      }

      var local = _.find(user.passports, {
        protocol: 'local',
        user: user.id
      });

      local.validatePassword(password, function(err, res) {
        if (err) {
          return next(err);
        }
        next (null, res ? user : false);
      });
    })
    .catch(next);
};
