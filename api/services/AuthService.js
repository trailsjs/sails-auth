var _ = require('lodash');

module.exports = {

  /**
   * @param req
   */
  buildCallbackNextUrl: function (req) {
    var url = req.query.next;
    var includeToken = req.query.includeToken;
    var accessToken = _.get(req, 'session.tokens.accessToken');

    if (includeToken && accessToken) {
      return url + '?access_token=' + accessToken;
    }
    else {
      return url;
    }
  }
};
