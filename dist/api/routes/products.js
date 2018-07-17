'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _productsModel = require('../../model/productsModel');

var _productsModel2 = _interopRequireDefault(_productsModel);

var _proiductController = require('../../controller/proiductController');

var _proiductController2 = _interopRequireDefault(_proiductController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_proiductController2.default.getProducts);
router.route('/').post(_proiductController2.default.postProducts);

exports.default = router;