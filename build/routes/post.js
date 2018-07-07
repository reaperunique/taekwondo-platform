'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let _express = require('express');

let _express2 = _interopRequireDefault(_express);

let _mongoose = require('mongoose');

let _mongoose2 = _interopRequireDefault(_mongoose);

let _post = require('../models/post');

let _post2 = _interopRequireDefault(_post);

let _user = require('../models/user');

let _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

let router = _express2.default.Router();

// LIST POSTS
router.get('/all', function(req, res, next) {
  _post2.default.find().populate('author').exec(function(err, posts) {
    if (err) return next(err);
    return res.json({
      posts: posts
    });
  });
});

// CREATE POST
router.post('/', function(req, res, next) {
  let post = new _post2.default();
  post.title = req.body.title;
  post.contents = req.body.contents;
  post.author = req.body.userId;
  post.save(function(err, post) {
    if (err) return next(err);
    return res.json({
      post: post
    });
  });

  // Every time I save a post,
  // I save the post in the user schema and update the user
  _user2.default.findByIdAndUpdate(req.body.userId, {
    $push: {
      posts: post._id
    }
  }, {new: true}, function(err) {
    if (err) return next(err);
    // The {new: true} option tells you
    // whether or not to return the modified object
  });
});

// RETRIEVE POST
// NOT USED YET
router.get('/:postId', function(req, res, next) {
  _post2.default.findById(req.params.postId).populate('author')
    .exec(function(err, post) {
      if (err) return next(err);
        return res.json({
          post: post
        });
    });
});

// UPDATE POST
router.put('/:postId', function(req, res, next) {
  console.log(req.params.postId);
  _post2.default
    .findByIdAndUpdate(req.params.postId, {$set: req.body}, {new: true})
    .populate('author')
    .exec(function(err, post) {
      if (err) return next(err);
      return res.json({
        post: post
      });
    });
});

// DELETE POST
router.delete('/:postId', function(req, res, next) {
  // Delete ObjectId from User schema when deleting posts
  _post2.default.findByIdAndRemove(req.params.postId, function(err) {
    if (err) return next(err);
    return res.json({
      success: true
    });
  });
});

let _default = router;
exports.default = _default;
;

let _temp = function() {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(router, 'router', 'server/routes/post.js');
  __REACT_HOT_LOADER__.register(_default, 'default', 'server/routes/post.js');
}();
