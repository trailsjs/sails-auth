var Sails = require('sails');
var request = require('supertest');
var ConfigOverrides = require('../config/env/testing');
var sails;

before(function(done) {

  Sails.lift(ConfigOverrides, function(err, server) {

    sails = server;

    if (err)
      return done(err);

    request(sails.hooks.http.app)
      .post('/register')
      .send({
        email: 'existing.user@email.com',
        password: 'admin1234'
      })
      .end(function(err) {
        done(err, sails);
      });

  });

});

after(function(done) {

  sails.lower(done);

});
