# <img src="http://cdn.tjw.io/images/sails-logo.png" height='43px' /> auth

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

[Passport](http://passportjs.org/)-based User Authentication system for [Sails.js](http://sailsjs.org) applications.

**Note:** For comprehensive user account control with role-based permissioning, object ownership, and row-level security, see [**sails-permissions**](https://github.com/tjwebb/sails-permissions), which uses this project as a dependency.

## 1. Install
```sh
$ npm install sails-auth --save
```
This will install `sails-auth` as a Sails Hook. The Hook uses
[marlinspike](https://github.com/tjwebb/marlinspike) to inject the relevant
Controllers, Policies, etc into your Sails application.

## 2. Configure

#### `config/passport.js`

By default, the `local` and `basic` strategies are enabled. See
[config/passport.js](https://github.com/tjwebb/sails-auth/blob/master/config/passport.js)
for examples of how to add and configure additional authentication strategies.

#### `config/auth.js`

```js
  bcrypt: {
    /**
     * Specifiy number of salt rounds to perform on password. Values >10 are
     * slow.
     */
    rounds: 8
  }
```

## 3. Authenticate!

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

## Maintained By
[<img src='http://i.imgur.com/zM0ynQk.jpg' height='36px'>](http://balderdash.co)
- [Travis Webb](https://github.com/tjwebb)
- [Ryan Quinn](https://github.com/ryanwilliamquinn)
- [Contributors](https://github.com/tjwebb/sails-auth/graphs/contributors)

[sails-logo]: http://cdn.tjw.io/images/sails-logo.png
[sails-url]: https://sailsjs.org
[npm-image]: https://img.shields.io/npm/v/sails-auth.svg?style=flat-square
[npm-url]: https://npmjs.org/package/sails-auth
[travis-image]: https://img.shields.io/travis/tjwebb/sails-auth.svg?style=flat-square
[travis-url]: https://travis-ci.org/tjwebb/sails-auth
[daviddm-image]: http://img.shields.io/david/tjwebb/sails-auth.svg?style=flat-square
[daviddm-url]: https://david-dm.org/tjwebb/sails-auth
