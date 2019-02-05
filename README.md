# OSCtoSocketIO

[/index.js](/index.js)  Sets up listening for OSC messages and web socket connections  
[/index.html](/index.html)  Example of HTML page getting OSC message over web socket & prints messages to console  
[/public/sketch.js](/public/sketch.js)  Example of P5.js sketch page getting OSC message over web socket  
[/public/sketch.html](/public/sketch.html)  Setup for P5.js sketch page  
  
From main directory run `npm install` and then `node .` to run your app  
To access index.html page visit `localhost:4243` in browser  
To access P5.js sketch example visit `localhost:4243/public/sketch.html` in browser  

If you want a different page other than index.html to be served up as the main page, change where it says /index.html to whatever page you want to serve up in this segment of index.js:  
```
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
```  

To send OSC messages to this app find the IP address of your computer (if running the project locally) and send messages to that IP address on port 6448. You can use a lot of applications to generate OSC messages and send them, [https://hexler.net/software/touchosc](TouchOSC) is a great option if you need some UI controls.
