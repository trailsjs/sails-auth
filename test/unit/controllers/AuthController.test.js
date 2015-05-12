var assert = require('assert');
var request = require('supertest');

describe('Auth Controller', function () {

  describe('#callback()', function () {

    describe('http request', function () {

      it ('passport-local authentication should succeed if email and password valid', function (done) {

        request(sails.hooks.http.app)
            .post('/auth/local')
            .send({
              identifier: 'existing.user@email.com',
              password: 'admin1234'
            })
            .expect(200)
            .end(function(err) {
              done(err);
            });

      });

      it ('passport-local authentication should fail and return error code if email is invalid', function (done) {

        request(sails.hooks.http.app)
            .post('/auth/local')
            .send({
              identifier: 'invalid@email.com',
              password: 'admin1234'
            })
            .expect(403)
            .end(function(err) {
              done(err);
            });

      });

      it ('passport-local authentication should fail and return error code if password is invalid', function (done) {

        request(sails.hooks.http.app)
            .post('/auth/local')
            .send({
              identifier: 'existing.user@email.com',
              password: 'invalid1235'
            })
            .expect(403)
            .end(function(err) {
              done(err);
            });

      });

    });

    describe('socket request', function () {

      it ('passport-local authentication should succeed if email and password valid', function (done) {

        io.socket.post('/auth/local', { identifier: 'existing.user@email.com', password: 'admin1234' }, function (data, jwres) {

          assert.equal(jwres.statusCode, 200);
          done();

        });

      });


      it ('passport-local authentication should fail and return error code if email is invalid', function (done) {

        io.socket.post('/auth/local', { identifier: 'invalid@email.com', password: 'admin1234' }, function (data, jwres) {

          assert.equal(jwres.statusCode, 403);
          done();

        });

      });

      it ('passport-local authentication should fail and return error code if password is invalid', function (done) {

        io.socket.post('/auth/local', { identifier: 'existing.user@email.com', password: 'invalid1235' }, function (data, jwres) {

          assert.equal(jwres.statusCode, 403);
          done();

        });

      });

    });

  });

});
