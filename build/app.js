'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let _express = require('express');
let _express2 = _interopRequireDefault(_express);

let _webpack = require('webpack');
let _webpack2 = _interopRequireDefault(_webpack);

let _webpackDevServer = require('webpack-dev-server');
let _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

let _mongoose = require('mongoose');
let _mongoose2 = _interopRequireDefault(_mongoose);

let _path = require('path');
let _path2 = _interopRequireDefault(_path);

let _morgan = require('morgan');
let _morgan2 = _interopRequireDefault(_morgan);

let _methodOverride = require('method-override');
let _methodOverride2 = _interopRequireDefault(_methodOverride);

let _bodyParser = require('body-parser');
let _bodyParser2 = _interopRequireDefault(_bodyParser);

let _passport = require('passport');
let _passport2 = _interopRequireDefault(_passport);

let _routes = require('./routes');
let _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

_mongoose2.default.Promise = global.Promise; // HTTP REQUEST LOGGER
// PARSE HTML BODY

require('./passport');

let app = (0, _express2.default)();
let port = process.env.PORT || 3000;
let devPort = 4000;
let dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/mernblog';
app.locals.appTitle = 'mern-blog';

/* mongodb connection */
let db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('openuri', function() {
  console.log('Connected to mongodb server');
});
// mongoose.connect('mongodb://username:password@host:port/database=');
_mongoose2.default.connect(dbUrl, {useMongoClient: true});

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({extended: true}));
app.use((0, _methodOverride2.default)());
app.use('/', _express2.default.static(
  _path2.default.join(__dirname, './../public')
));
app.use(_passport2.default.initialize());
app.use('/api', _routes2.default);
app.get('*', function(req, res) {
  res.sendFile(_path2.default.resolve(__dirname, './../public/index.html'));
});

if (process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  let config = require('../webpack.dev.config');
  let compiler = (0, _webpack2.default)(config);
  let devServer = new _webpackDevServer2.default(compiler, config.devServer);
  devServer.listen(devPort, function() {
    console.log('webpack-dev-server is listening on port: ', devPort);
  });
}

app.listen(port, function() {
  console.log('Express is listening on port: ', port);
});

let _default = app;
exports.default = _default;
;

let _temp = function() {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(app, 'app', 'server/app.js');
  __REACT_HOT_LOADER__.register(port, 'port', 'server/app.js');
  __REACT_HOT_LOADER__.register(devPort, 'devPort', 'server/app.js');
  __REACT_HOT_LOADER__.register(dbUrl, 'dbUrl', 'server/app.js');
  __REACT_HOT_LOADER__.register(db, 'db', 'server/app.js');
  __REACT_HOT_LOADER__.register(_default, 'default', 'server/app.js');
}();
