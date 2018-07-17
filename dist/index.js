'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 5000;
var server = _http2.default.createServer(_app2.default);

var io = (0, _socket2.default)(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', function (socket) {
  console.log('User connected');

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('change color', function (color) {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('Color Changed to: ', color);
    io.sockets.emit('change color', color);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

server.listen(port, function () {
  console.log('server running');
});