module.exports = function (sails) {
  return {
    initialize: function (next) {
      sails.services.passport.loadStrategies();
      next();
    }
  };
};
