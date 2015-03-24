var assert = require('assert'),
    request = require('supertest');

describe('User Controller', function () {

    describe('#create()', function () {

        it ('should be able to create new user', function (done) {

            request(sails.hooks.http.app)
                .post('/register')
                .send({
                    email: 'new.user@email.com',
                    password: 'admin1234'
                })
                .expect(200)
                .end(function(err) {
                    done(err);
                });

        });

        it ('should return error if user already exists', function (done) {

            request(sails.hooks.http.app)
                .post('/register')
                .send({
                    email: 'new.user@email.com',
                    password: 'admin1234'
                })
                .expect(500)
                .end(function(err) {
                    done(err);
                });

        });

    });

});
