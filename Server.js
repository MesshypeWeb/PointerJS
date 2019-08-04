var express = require("express")
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/demo.html")
});

app.get("/pointer", (req, res) =>{
    res.sendFile(__dirname + "/Pointer.html")
})
var usersonline = 0;
io.on("connection", (socket) =>{
        usersonline++;
   
    console.log(socket.id)
    console.log(`1 user connected. Currently ${usersonline} Users are online`);
    socket.on("height", (numbers) =>{
        socket.broadcast.emit("height", numbers);
    });

    socket.on("Coordinates", (coordinates) =>{
            if(coordinates == false){socket.broadcast.emit("coordinates", coordinates);}
               socket.broadcast.emit("coordinates", coordinates)
    });
    socket.on("ChangeSlide", (msg) =>{
            socket.broadcast.emit('ChangeSlide', msg);
        
    })
    socket.on("currentSlide", (msg) =>{
        socket.broadcast.emit('Slide', msg)
    });
    
    socket.on('disconnect', function(){
        usersonline--;
        console.log(`1 User disconnected. Currently ${usersonline} Users are online`)
    })
});


http.listen(3000, function(){
    console.log('listening on *:3000');
  });