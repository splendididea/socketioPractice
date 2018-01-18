var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(9999);
console.log('Server is starting port 9999');
app.get('/', function(req, res){

    // console.log('index!!!!!!');
    res.sendFile( __dirname + '/index.html');
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
        io.emit('User disconnected');
    });
});