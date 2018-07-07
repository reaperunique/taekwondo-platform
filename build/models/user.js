'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let _mongoose = require('mongoose');

let _mongoose2 = _interopRequireDefault(_mongoose);

let _jsonwebtoken = require('jsonwebtoken');

let _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

let _crypto = require('crypto');

let _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

let Schema = _mongoose2.default.Schema;

let userSchema = new Schema({
  email: String,
  name: String,
  hash: String,
  salt: String,
  posts: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

userSchema.methods.setPassword = function(password) {
  this.salt = _crypto2.default.randomBytes(16).toString('hex');
  this.hash = _crypto2.default.pbkdf2Sync(
                password, this.salt, 1000, 64, 'sha512'
              ).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  let hash = _crypto2.default.pbkdf2Sync(
                password, this.salt, 1000, 64, 'sha512'
              ).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return _jsonwebtoken2.default.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, 'mernblog');
};

let _default = _mongoose2.default.model('User', userSchema);

exports.default = _default;

let _temp = function() {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(
    Schema, 'Schema', 'server/models/user.js'
  );

  __REACT_HOT_LOADER__.register(
    userSchema, 'userSchema', 'server/models/user.js'
  );

  __REACT_HOT_LOADER__.register(
    _default, 'default', 'server/models/user.js'
  );
}();
