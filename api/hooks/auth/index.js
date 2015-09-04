import _ from 'lodash'
import Marlinspike from 'marlinspike'

class Auth extends Marlinspike {

  constructor (sails) {
    super(sails, module)
  }

  configure () {
    sails.services.passport.loadStrategies()
  }
}

export default Marlinspike.createSailsHook(Auth)
