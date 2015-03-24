var Sails = require('sails');
var ConfigOverrides = require('../config/env/testing');
var sails;

before(function(done) {

  Sails.lift(ConfigOverrides, function(err, server) {

    sails = server;

    if (err) return done(err);

    done(err, sails);

  });

});

after(function(done) {

  sails.lower(done);

});
