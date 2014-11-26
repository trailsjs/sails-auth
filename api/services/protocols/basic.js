module.exports = function (req, username, password, next) {
  sails.log('using basic strategy for user', username, ', password', password);
  User.findOne({ username: username })
    .populate('passports')
    .then(function (user) {
      sails.log('found user', user.username);
      if (!user) {
        return next(null, false);
      }

      var local = _.find(user.passports, {
        protocol: 'local',
        user: user.id
      });

      sails.log('found passport', local.id);
      sails.log('validating password...');

      local.validatePassword(password, function(err, res) {
        sails.log('passport validation complete');
        if (err) {
          return next(err);
        }
        next (null, res ? user : false);
      });
    })
    .catch(next);
};
