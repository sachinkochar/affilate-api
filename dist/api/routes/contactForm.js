'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
    res.status(200).json({
        message: 'Handling Get orders'
    });
});

router.post('/save', function (req, res, next) {
    console.log(req.body, 'post');
    var name = req.body.name;
    res.status(200).json({
        message: 'Handling Post request ',
        data: name
    });
});

router.get('/:orderId', function (req, res, next) {
    res.status(201).json({
        message: 'Order details',
        id: req.params.orderId
    });
});

router.delete('/:orderId', function (req, res, next) {
    res.status(201).json({
        message: 'Order deleted',
        id: req.params.orderId
    });
});

exports.default = router;