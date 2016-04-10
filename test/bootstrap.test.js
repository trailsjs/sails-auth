var Sails = require('sails');
var request = require('supertest');
var ConfigOverrides = require('../config/env/testing');
var sails;

before(function (done) {

  Sails.lift(ConfigOverrides, function (err, server) {

    sails = server;

    if (err)
      return done(err);

    var client = require('../assets/js/dependencies/sails.io.js');

    global.io = new client(require('socket.io-client'));
    io.sails.url = 'http://localhost:1448/';

    request(sails.hooks.http.app)
      .post('/register')
      .send({
        email: 'existing.user@email.com',
        password: 'admin1234'
      })
      .end(function (err) {
        done(err, sails);
      });

  });

});

after(function (done) {
  if (!sails) done();
  else sails.lower(done)
});
