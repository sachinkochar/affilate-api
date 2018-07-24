import config from './config'
// Server file 

// import http module
import http from "http";

//import express app 
import app from "./app.js";
import socket from 'socket.io';
import chatRoom from './models/chatModel';
import messages from './models/messages';
//setting the port for server
var port = 0;

if(process.env.NODE_ENV === 'production') {
   port = process.env.PROD_PORT || 4001;
} else {
  port = process.env.DEV_PORT || 3000;
}


//creating server using express app
const server = http.createServer(app);


// server listening to the requests.
server.listen(port, function(err) {
   if (err) {
      console.log("Error in starting server", err);
   }
    console.log(`Your App is Running on Port : ${port}`);
});
var io = socket(server);
var users={
  User1:"5b4f2982bdd41a242a40c16a",
  User2:"5b4f29ffbdd41a242a40c16c"
}
io.on('connection', (socket) => {
    console.log(socket.id);
    io.emit('CONNECTION_DONE');
    // var newRoom = new chatRoom({
    //   roomId:Math.floor((Math.random() * 100) + 1),
    //   user:[ users.User1,users.USer2 ]
    // });
    // newRoom.save().then((res) => { 
    //   io.emit('ROOM_CREATED',res);
    //  }).catch((err)=>{console.log(err,'error')});


    socket.on('SEND_MESSAGE', function(data){
      console.log(data,'message data')
        var new_message = new messages({
          roomId:data.roomId,
          member:data.user,
          message: data.message
        });
        new_message.save().then((res)=>{
         messages.find({ 'roomId':data.roomId   }).then((res)=>{
            io.emit('RECEIVE_MESSAGE', res);
          })
          // console.log(all_messages)
        }).catch((err)=>{console.log(err)})
    })
    socket.on('CREATE_ROOM', function(data){
    })
});

module.exports = server;