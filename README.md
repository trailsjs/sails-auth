# sails-auth

[![Looking for maintainers][hacktober-image]][hacktober-url]


[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

[Passport](http://passportjs.org/)-based User Authentication system for Sails.js applications.

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
[config/passport.js](https://github.com/langateam/sails-auth/blob/master/config/passport.js)
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

Create users as you normally would (`POST` to `/user`). Authenticate using the endpoint of the provider you've chosen.

#### Local
Authenticate with the local strategy via a `POST` to `/auth/local` with params
`identifier` (email) and `password`). This will also create a session. See [passport.local](https://github.com/jaredhanson/passport-local) for more.

#### HTTP Basic and Digest
See [passport.http](https://github.com/jaredhanson/passport-http).

#### Additional Passport Strategies
- [passport.google](https://github.com/jaredhanson/passport-google-oauth)
- [passport.twitter](http://passportjs.org/guide/twitter/)
- [passport.github](https://github.com/jaredhanson/passport-github)
- [passport.facebook](http://passportjs.org/guide/facebook/)
- et al

#### `/user/me`
Returns `User` for this authenticated session.

## Permissions
For comprehensive user account control with role-based permissioning, object ownership, and row-level security, see [**sails-permissions**](https://github.com/langateam/sails-permissions), which uses this project as a dependency.

## License
MIT

## Maintained By
[<img src='http://i.imgur.com/Y03Jgmf.png' height='64px'>](http://langa.io)
- [Travis Webb](https://github.com/tjwebb)
- [Ryan Quinn](https://github.com/ryanwilliamquinn)
- [Contributors](https://github.com/langateam/sails-auth/graphs/contributors)

[npm-image]: https://img.shields.io/npm/v/sails-auth.svg?style=flat-square
[npm-url]: https://npmjs.org/package/sails-auth
[travis-image]: https://img.shields.io/travis/langateam/sails-auth.svg?style=flat-square
[travis-url]: https://travis-ci.org/langateam/sails-auth
[daviddm-image]: http://img.shields.io/david/langateam/sails-auth.svg?style=flat-square
[daviddm-url]: https://david-dm.org/langateam/sails-auth
[hacktober-image]: http://i.imgur.com/FM9yVCI.png
[hacktober-url]: https://twitter.com/langateam/status/782995392212369408
