'use strict';

let _passport = require('passport');
let _passport2 = _interopRequireDefault(_passport);

let _passportLocal = require('passport-local');
let _passportLocal2 = _interopRequireDefault(_passportLocal);

let _mongoose = require('mongoose');
let _mongoose2 = _interopRequireDefault(_mongoose);

let _user = require('./models/user');
let _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

let LocalStrategy = _passportLocal2.default.Strategy;

_passport2.default.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  // User.findOne({email: email}).populate('posts').exec(function(err, user) {
  _user2.default.findOne({email: email}).exec(function(err, user) {
    if (err) return done(err);
    if (!user) {
      // 처번째 인자가 err
      // 세번째 인자가 info
      return done(null, null, {
        message: 'User not found'
      });
    }
    if (!user.validPassword(password)) {
      return done(null, null, {
        message: 'Password is wrong'
      });
    }
    return done(null, user);
  });
}));
;

let _temp = function() {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(
    LocalStrategy, 'LocalStrategy', 'server/passport.js'
  );
}();
