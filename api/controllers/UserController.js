/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * @override
   */
  create: function (req, res, next) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return res.negotiate(err);

      res.ok(user);
    });
  },

  update: function (req, res, next) {
    sails.services.passport.protocols.local.update(req.body, function (err, user) {
      if (err) return res.negotiate(err);

      res.ok(user);
    });
  },

  me: function (req, res) {
    res.ok(req.user);
  }
};

