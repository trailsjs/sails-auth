var assert = require('assert');
var request = require('supertest');
var _ = require('lodash');

describe('User Controller', function () {

  before(function (done) {
    request(sails.hooks.http.app)
      .post('/register')
      .send({
        email: 'me@mocha.test',
        password: 'admin1234'
      })
      .expect(200)
      .end(function (err) {
        done(err);
      });
  });

  describe('#me()', function () {
    it('should return User for this authenticated session', function (done) {
        var agent = request.agent(sails.hooks.http.app);

        agent
          .get('/user/me')
          .auth('me@mocha.test', 'admin1234')
          .expect(200)
          .end(function (err, res) {
            var user = res.body;
            assert(_.isObject(user));
            assert.equal(user.email, 'me@mocha.test');
            done(err);
          });
    });
  });

  describe('#create()', function () {

    describe('http request', function () {

      it('should be able to create new user', function (done) {

        request(sails.hooks.http.app)
            .post('/register')
            .send({
              email: 'new.user@email.com',
              password: 'admin1234'
            })
            .expect(200)
            .end(function (err) {
              done(err);
            });

      });

      it('should return error if user already exists', function (done) {

        request(sails.hooks.http.app)
            .post('/register')
            .send({
              email: 'new.user@email.com',
              password: 'admin1234'
            })
            .expect(400)
            .end(function (err) {
              done(err);
            });

      });

    });

    describe('socket request', function () {

      it('should be able to create new user', function (done) {

        io.socket.post('/register', { email: 'new.socketuser@email.com', password: 'admin1234' }, function (data, jwres) {

          assert.equal(jwres.statusCode, 200);
          done();

        });

      });

      it('should return error if user already exists', function (done) {

        io.socket.post('/register', { email: 'new.socketuser@email.com', password: 'admin1234' }, function (data, jwres) {

          assert.equal(jwres.statusCode, 400);
          done();

        });

      });

    });

  });

  describe('#findOne()', function () {

    describe('http request', function () {

      var userId;

      it('should find user if they have been authenticated', function (done) {

        var agent = request.agent(sails.hooks.http.app);

        agent
            .post('/auth/local')
            .send({
              identifier: 'existing.user@email.com',
              password: 'admin1234'
            })
            .expect(200, function (err, res) {

              if (err)
                return done(err);

              userId = res.body.id;

              agent
                  .get('/user/' + userId)
                  .expect(200)
                  .end(function (err) {
                    done(err);
                  });
            });

      });

      it('should not find user if they have logged out', function (done) {

        var agent = request.agent(sails.hooks.http.app);

        agent
            .post('/logout')
            .expect(302, function (err, res) {

              if (err)
                return done(err);

              agent
                  .get('/user/' + userId)
                  .expect(403)
                  .end(function (err) {
                    done(err);
                  });
            });

      });

    });

    describe('socket request', function () {

      var userId;

      it('should find user if they have been authenticated', function (done) {

        io.socket.post('/auth/local', { identifier: 'existing.user@email.com', password: 'admin1234' }, function (data, jwres) {

          assert.equal(jwres.statusCode, 200);

          userId = data.id;

          io.socket.get('/user/' + userId, function(data, jwres) {

            assert.equal(jwres.statusCode, 200);

            done();

          });

        });

      });

      it('should not find user if they have logged out', function (done) {

        io.socket.post('/logout', function (data, jwres) {

          assert.equal(jwres.statusCode, 200);

          io.socket.get('/user/' + userId, function(data, jwres) {

            assert.equal(jwres.statusCode, 403);

            done();

          });

        });

      });

    });

  });

});
