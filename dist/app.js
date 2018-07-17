'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./api/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var bodyParser = require('body-parser');
var dbUrl = require('./config/config');
var uri = dbUrl.database.connectionString;
app.use((0, _morgan2.default)('dev'));

_mongoose2.default.connect(uri, function (err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log('MongoDB is at your service');
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((0, _cors2.default)());
app.use('/api', _routes2.default);

// app.use('/orders',ordersRoutes);
// })

app.use(function (req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

exports.default = app;