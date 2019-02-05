/* Example of using data from OSC messages in a p5.js sketch */

var socket = io();

function setup() {
  // Runs when the server receives an OSC message & sends it over websocket.
  // Do something with it
  socket.on('osc', function(msg){
    var osc_address = msg["address"];
    var osc_values = msg["payload"];
    //do something with your new data here
  });
}

function draw() {
  
}