var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('connection!!!!');
    socket.emit('news', { hello : 'world'});
    socket.on('my other event', function(data){
        console.log(data);
    });

    socket.on('private message', function(from, msg){
        console.log('I received a private message by', from, ' saying ', msg );
    });

    socket.on('disconnect',function(data){
        console.log('disconnect');
        io.emit('User disconnected');
    });
});

http.listen( 9999 , function(){
    console.log('Server Listening 9999');
});