var assert = require('assert');
var request = require('supertest');
var _ = require('lodash');

describe('AuthService', function () {
  var AuthService = require('../../../api/services/AuthService');

  describe('#buildCallbackNextUrl()', function () {
    var req = {
      query: {
        next: 'http://www.google.com'
      },
      session: {
      }
    };

    it('should omit access_token in the next url by default', function () {
      var url = AuthService.buildCallbackNextUrl(req);

      assert.equal(url, 'http://www.google.com');
    });

    it('should omit access_token in the next url if includeToken is false/missing', function () {
      var omitTokenReq = _.merge({
        session: {
          tokens: {
            accessToken: '12345'
          }
        }
      }, req);
      var url = AuthService.buildCallbackNextUrl(omitTokenReq);

      assert.equal(url, 'http://www.google.com');
    });

    it('should include access_token in the next url if specified', function () {
      var includeTokenReq = _.merge({
        query: {
          includeToken: true
        },
        session: {
          tokens: {
            accessToken: '12345'
          }
        }
      }, req);

      var url = AuthService.buildCallbackNextUrl(includeTokenReq);
      
      assert.equal(url, 'http://www.google.com?access_token=12345');
    });
  });
});
