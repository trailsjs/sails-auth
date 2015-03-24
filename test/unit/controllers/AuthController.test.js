var assert = require('assert'),
    request = require('supertest');

before(function(done) {

    request(sails.hooks.http.app)
        .post('/register')
        .send({
            email: 'new.user2@email.com',
            password: 'admin1234'
        })
        .expect(200)
        .end(function(err) {
            done(err);
        });

});


describe('Auth Controller', function () {

    describe('#callback()', function () {

        it ('passport-local authentication should succeed if email and password valid', function (done) {

            request(sails.hooks.http.app)
                .post('/auth/local')
                .send({
                    identifier: 'new.user2@email.com',
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
                    identifier: 'new.user3@email.com',
                    password: 'admin1234'
                })
                .expect(500)
                .end(function(err) {
                    done(err);
                });

        });

        it ('passport-local authentication should fail and return error code if password is invalid', function (done) {

            request(sails.hooks.http.app)
                .post('/auth/local')
                .send({
                    identifier: 'new.user2@email.com',
                    password: 'admin1235'
                })
                .expect(500)
                .end(function(err) {
                    done(err);
                });

        });

    });

});
