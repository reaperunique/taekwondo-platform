'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let _mongoose = require('mongoose');

let _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
      default: obj
    };
}

let Schema = _mongoose2.default.Schema;

let postSchema = new Schema({
  title: String,
  contents: String,
  author: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  }
});

let _default = _mongoose2.default.model('Post', postSchema);

exports.default = _default;
;

let _temp = function() {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(
    Schema, 'Schema', 'server/models/post.js'
  );

  __REACT_HOT_LOADER__.register(
    postSchema, 'postSchema', 'server/models/post.js'
  );

  __REACT_HOT_LOADER__.register(
    _default, 'default', 'server/models/post.js'
  );
}();
