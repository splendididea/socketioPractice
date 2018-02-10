var io = require('socket.io')(9090);

io.on('connection',function(socket){
    io.emit('this' , {will : 'be recieved by everyone'});

    socket.on('private message', function(from , msg){

    });
});