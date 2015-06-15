var util = require('util');
var _ = require('lodash');
var errors = {
  'email': {
    'email': 'Error.Passport.Email.Invalid',
    'unique': 'Error.Passport.Email.Exists',
    'notNull': 'Error.Passport.Email.Missing'
  },
  'username': {
    'string': 'Error.Passport.Username.Invalid',
    'unique': 'Error.Passport.User.Exists',
    'notNull': 'Error.Passport.Username.Missing'
  },
  'password': {
    'string': 'Error.Passport.Password.Invalid',
    'minLength': 'Error.Passport.Password.Short',
  }
}

/**
 * SAError
 *
 * Dress up an error to relay authentication/authorisation related errors
 * without revealing sensitive information.
 *
 * @param  {Object} properties
 * @constructor {SAError}
 */
function SAError (properties) {

  // Call superclass (Error)
  SAError.super_.call(this, properties);

  // Merge the properties into the error instance
  properties || (properties = { });
  _.extend(this, properties);

  // Customize the `reason` based on the # of invalid attributes
  // (`reason` may not be overridden)
  var isSingular = this.length === 1;
  this.reason = util.format('%d attribute%s %s invalid',
    this.length,
    isSingular ? '' : 's',
    isSingular ? 'is' : 'are');

  // Always apply the 'E_VALIDATION' error code, even if it was overridden.
  this.code = 'E_VALIDATION';

  // Status may be overridden.
  this.status = properties.status || 400;

  if (this.originalError) {
    if (this.originalError.invalidAttributes) {
      this.invalidAttributes = _.mapValues(this.originalError.invalidAttributes, function(n, k) {
        return _.map(n, function(i) {
          // Set a new message if we have one
          if (_.has(errors, [k, i.rule])) {
            i.message = errors[k][i.rule];
          }

          // Remove all elements but the message
          _.forEach(_.without(_.keys(i), 'message'), function(key) {
            delete i[key];
          })

          return i;
        })

        return n;
      });
    }

  }
}

util.inherits(SAError, Error);

// Default properties
SAError.prototype.status = 400;
SAError.prototype.summary = 'Encountered an unexpected error';

/**
 * Override JSON serialization.
 * (i.e. when this error is passed to `res.json()` or `JSON.stringify`)
 *
 * For example:
 * ```json
 * {
 *   status: 400,
 *   code: 'E_UNKNOWN'
 * }
 * ```
 *
 * @return {Object}
 */
SAError.prototype.toJSON =
SAError.prototype.toPOJO =
  function () {
    var obj = {
      status: this.status,
      summary: this.summary,
      invalidAttributes: this.invalidAttributes
    };


    return obj;
  };


module.exports = SAError;
