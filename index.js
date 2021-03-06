var OSC_RECIEVE_PORT = 8888 // port listening receives OSC msgs on
var WS_PORT = 4243          // port listening to web sockte connections from clients on

var osc = require('node-osc');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var open_sockets = []; // keeps track of connected clients

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  open_sockets.push(socket);
  socket.on('disconnect', function(){
    // remove disconnected socket from our list of open sockets
    open_sockets = open_sockets.filter(function(item){
      return item != socket;
    });
  });
});

http.listen(WS_PORT, function(){
  console.log('listening for WEBSOCKET connections on *:'+WS_PORT);
});

var oscServer = new osc.Server(OSC_RECIEVE_PORT, '0.0.0.0'); // IP can be changed to not be localhost
                                                             // if actually hosting on a server
console.log('listening for OSC packets on *:'+OSC_RECIEVE_PORT);
oscServer.on("message", function (msg, rinfo) {
  console.log("OSC message received:");
  console.log(msg);
  // when an OSC message is received, send the data to your client over web socket
  open_sockets.forEach(function(socket){
    socket.emit("osc", {'address':msg[0], 'payload':msg.slice(1)});
  })
});