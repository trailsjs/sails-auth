# <img src="http://cdn.tjw.io/images/sails-logo.png" height='43px' /> auth

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

Passport-based User Authentication system for sails.js applications.

**Note:** For comprehensive user account control with role-based permissioning, object ownership, and row-level security, see [**sails-permissions**](https://github.com/tjwebb/sails-permissions), which uses this project as a dependency.

## Install
```sh
$ npm install sails-auth --save
```

## Usage

### 1. configure .sailsrc

```json
{
  "generators": {
    "modules": {
      "auth-api": "sails-auth"
    }
  }
}
```

### 2. install sails.js extension
```sh
$ sails generate auth-api
```

#### config/policies.js
```js
  '*': [ 'basicAuth', 'passport', 'sessionAuth' ],

  AuthController: {
    '*': [ 'passport' ]
  }
```

### 3. authenticate!

Create users as you normally would (`POST` to `/user`). Authenticate using the
endpoint of the provider you've chosen.

#### `/user/me`
Returns `User` for this authenticated session.

#### Passport Protocols
- [passport.google](https://github.com/jaredhanson/passport-google-oauth)
- [passport.twitter](http://passportjs.org/guide/twitter/)
- [passport.github](https://github.com/jaredhanson/passport-github)
- [passport.facebook](http://passportjs.org/guide/facebook/)
- et al

## License
MIT

[sails-logo]: http://cdn.tjw.io/images/sails-logo.png
[sails-url]: https://sailsjs.org
[npm-image]: https://img.shields.io/npm/v/sails-auth.svg?style=flat-square
[npm-url]: https://npmjs.org/package/sails-auth
[travis-image]: https://img.shields.io/travis/tjwebb/sails-auth.svg?style=flat-square
[travis-url]: https://travis-ci.org/tjwebb/sails-auth
[daviddm-image]: http://img.shields.io/david/tjwebb/sails-auth.svg?style=flat-square
[daviddm-url]: https://david-dm.org/tjwebb/sails-auth
