import _ from 'lodash'
import Marlinspike from 'marlinspike'

class Auth extends Marlinspike {

  constructor (sails) {
    super(sails, module)
  }

  initialize (next) {
    sails.services.passport.loadStrategies()
    next()
  }
}

export default Marlinspike.createSailsHook(Auth)
