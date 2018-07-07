'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let _express = require('express');

let _express2 = _interopRequireDefault(_express);

let _user = require('./user');

let _user2 = _interopRequireDefault(_user);

let _post = require('./post');

let _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

// const jwt from 'express-jwt';
// const auth = jwt({
//   secret: 'mernblog',
//   userProperty: 'payload'
// });

let router = _express2.default.Router();

router.use('/*', function(req, res, next) {
  res.setHeader("Expires", "-1");
  res.setHeader("Cache-Control", "must-revalidate, private");
  next();
});

// DATA FOR USER
router.use('/user', _user2.default);
router.use('/post', _post2.default);

let _default = router;
exports.default = _default;
;

let _temp = function() {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(router, 'router', 'server/routes/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'server/routes/index.js');
}();
