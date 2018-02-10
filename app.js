var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var port = process.env.PORT || 9999;

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
        //io.emit('User disconnected');
    });

    // 새 메시지 보내기
    socket.on('new message', function(data){
        socket.broadcast.emit('new message', {
            username: socket.username, 
            message: data
        });
    });

    socket.on('chat', function(data){
        console.log(data);
        socket.emit('recieve', data);
    });
}); 

http.listen( port , function(){
    console.log('Server Listening 9999');
});