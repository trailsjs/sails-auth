var _ = require('lodash');
//const util = require('util');

/**
 * Delegated Authentication Protocol
 *
 * Authentication is delegated by the Strategy to an external provider
 * but handled locally (e.g. makes request internally to external provider)
 * unlike OAuth or similar which redirects to the external provider.
 * On success the authenticated user is connected to a local user (created if
 * necessary) in a similar manner to OAuth.
 *
 * @param {Object}   req
 * @param {Object}   userprofile
 * @param {Function} next
 */

module.exports = function (req, userprofile, next) {

	//sails.log.debug('delegated: connecting user', util.inspect(userprofile));
	//sails.log.debug('delegated: session is ', util.inspect(req.session));

	var query = {
		identifier: userprofile.id,
		protocol: 'delegated'
	};

	sails.services.passport.connect(req, query, userprofile, next);

	/*
	sails.services.passport.connect(req, query, userprofile, function(err, user) {
		if(user!=null) sails.log.debug('delegated: got user', util.inspect(user));
		user.profile = userprofile;
		next(err, user);
	});
	*/
};
