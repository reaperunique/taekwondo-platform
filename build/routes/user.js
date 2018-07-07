'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let _express = require('express');
let _express2 = _interopRequireDefault(_express);
let _passport = require('passport');
let _passport2 = _interopRequireDefault(_passport);
let _user = require('../models/user');
let _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
     default: obj
    };
}

let router = _express2.default.Router();

/*
  ACCOUNT SIGN UP: POST /api/user/signup
  BODY SAMPLE: {
    "email": "test",
    "name": "test",
    "password": "test",
  }
  ERROR CODES:
    1: BAD USERNAME
    2: BAD PASSWORD
    3: USERNAME EXISTS
*/
router.post('/signup', function(req, res) {
  // CHECK USERNAME FORMAT
  // 정규식 for Email 만들기
  // let usernameRegex = /^[a-z0-9]+$/;
  //
  // if(!usernameRegex.test(req.body.username)) {
  //   return res.status(400).json({
  //     error: "BAD USERNAME",
  //     code: 1,
  //   });
  // }

  // CHECK PASS LENGTH
  if (req.body.password.length < 4 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }

  // CHECK USER EXISTANCE
  _user2.default.findOne({email: req.body.email},
    function(err, exists) {
    if (err) throw err;
    if (exists) {
      return res.status(409).json({
        error: "EMAIL EXISTS",
        code: 3
      });
    }

    // CREATE ACCOUNT
    let user = new _user2.default();
    user.email = req.body.email;
    user.name = req.body.name;
    user.setPassword(req.body.password);

    // SAVE IN THE DATABASE
    user.save(function(err, user) {
      if (err) throw err;
      return res.json({
        success: true
      });
      // res.render('profile', {user: req.session.user});
    });
  });
});

/*
  ACCOUNT SIGN IN: POST /api/user/signin
  BODY SAMPLE: {
    "email": "test",
    "password": "test",
  }
  ERROR CODES:
    1: SIGN IN FAILED
*/
router.post('/signin', function(req, res) {
  if (typeof req.body.password !== 'string') {
    return res.status(401).send({
      failReason: 'Password you put is not characters.'
    });
  }

  _passport2.default.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(401).send({
        failReason: 'err authenticate in server ' + err
      });
    }
    if (user) {
      let token = user.generateJwt();
      return res.json({
        token: token
      });
    } else {
      res.status(401).send({
        failReason: info
      });
    }
  })(req, res);
});

router.get('/getstatus', function(req, res) {
  _user2.default.findOne({_id: req.body.id}, function(err, user) {
    let result = false;
    if (user) {
      result = true;
    }
    res.json({
      result: result
    });
  });
});

let _default = router;
exports.default = _default;

let _temp = function() {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(router, 'router', 'server/routes/user.js');
  __REACT_HOT_LOADER__.register(_default, 'default', 'server/routes/user.js');
}();
