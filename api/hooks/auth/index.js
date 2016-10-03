let authHook = sails.hooks.auth;

import _ from 'lodash'
import Marlinspike from 'marlinspike'

if (!authHook) {
  class Auth extends Marlinspike {

    constructor(sails) {
      super(sails, module)
    }

    configure() {
      sails.services.passport.loadStrategies()
    }
  }

  authHook = Marlinspike.createSailsHook(Auth)
}

export default authHook;