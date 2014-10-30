# <img src="http://cdn.tjw.io/images/sails-logo.png" height='43px' />-auth

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

## Install
```sh
$ npm install sails-auth --save
```

## Usage

### 1. generate auth-api
```sh
$ sails generate auth-api
```

### 2. update configs
#### config/http.js
```js
module.exports.http = {
  ...
  middleware: {
    passportInit: require('sails-auth/node_modules/passport').initialize(),
    passportSession: require('sails-auth/node_modules/passport').session(),

    order: [
      ...
      'session',
      'passportInit',
      'passportSession',
      ...
    ]
  }
}
```

#### config/routes.js
```js
module.exports.routes = {
  ...
};
_.defaults(exports.routes, require('sails-auth/config/routes'));
```

#### config/policies.js
```js
  '*': [ 'passport', 'sessionAuth' ],

  AuthController: {
    '*': true
  }
```

## Entities

- **Models**
  - Passport
- **Controllers**
  - AuthController
- **Policies**
  - passport
- **Services**
  - passport
  - protocols/local
  - protocols/oauth
  - protocols/oauth2
  - protocols/openid


#### Passport Protocols
- [passport.google](http://passportjs.org/guide/google/)
- [passport.twitter](http://passportjs.org/guide/twitter/)
- [passport.github](https://github.com/jaredhanson/passport-github)
- [passport.facebook](http://passportjs.org/guide/facebook/)

## License
MIT

## Related Projects
- [**sails-generate-authentication-api**](https://github.com/tjwebb/sails-generate-authentication-api)
- [**sails-permissions**](https://github.com/tjwebb/sails-permissions)
- [**sails-generate-auth**](https://github.com/kasperisager/sails-generate-auth)

[sails-logo]: http://cdn.tjw.io/images/sails-logo.png
[sails-url]: https://sailsjs.org
[npm-image]: https://img.shields.io/npm/v/sails-auth.svg?style=flat
[npm-url]: https://npmjs.org/package/sails-auth
[travis-image]: https://img.shields.io/travis/tjwebb/sails-auth.svg?style=flat
[travis-url]: https://travis-ci.org/tjwebb/sails-auth
[daviddm-image]: http://img.shields.io/david/tjwebb/sails-auth.svg?style=flat
[daviddm-url]: https://david-dm.org/tjwebb/sails-auth
