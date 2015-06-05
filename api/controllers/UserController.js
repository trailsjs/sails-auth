/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (!err) return res.ok(user);
      if (err.message === 'Error.Passport.Password.Invalid') return res.badRequest(err);
      return res.serverError(err);
    });
  },

  me: function (req, res) {
    res.ok(req.user);
  }
};

