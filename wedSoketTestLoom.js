const express = require('express');
const bodyParser = require('body-parser');


const socketio = require('socket.io')
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


var server = app.listen(3000,()=>{
    console.log('Server is running on port number 3000')
})


//Chat Server

var io = socketio(server)

io.on('connection',function(socket) {

    //The moment one of your client connected to socket.io server it will obtain socket id
    //Let's print this out.
    console.log(`Connection : SocketId = ${socket.id}`)
    //Since we are going to use userName through whole socket connection, Let's make it global.   
    var userName = '';
   
    socket.on("test",function(data){
    
      const room_data = JSON.parse(data)
      userName = room_data.userName;
      const roomName = room_data.roomName;
      console.log(`Connection : SocketId = ${roomName}`)
      socket.join(`${roomName}`)
    
      io.to(`${roomName}`).emit('test',data)
     //io.to('${roomName}').emit('snedMsg', data)
     
      //socket.emit('test',userName)
      
      
      



    })

    

    socket.on('disconnect', function () {
        console.log("One of sockets disconnected from our server.")
    });
})