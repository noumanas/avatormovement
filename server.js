const express = require('express');
const app = express();
const PORT= process.env.PORT || 5500;
app.use(express.static('public'));
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => res.sendFile(__dirname+ '/index.html'));
server.listen(PORT, function(){
    console.log(`listing on ${PORT}`);
})

let users = {};
io.on('connection', connected);
function connected (socket){
  
    socket.on('send-chat-message', message =>{
        console.log("new user connected with id: "+socket.id);
        users[socket.id] == message;
        console.log('total users: '+Object.keys(users).length);
        socket.broadcast.emit('chat-message', message);
        socket.emit('chat-message',message);
    })
    socket.on('value_of_x', x =>{
        socket.broadcast.emit('updated_x', x);
        console.log(x);
    })
    socket.on('value_of_y', y =>{
        socket.broadcast.emit('updated_y', y);
        console.log(y);
    })
    socket.on('username', username =>{
        socket.broadcast.emit('update_user', username);
        console.log(username);
    })
    socket.on("send_user_class" ,data=>{
        
    })
    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnect', users[socket.id])
        delete users[socket.id]
    })
}

// io.on('connection', connected);

//listening to events after the connection is estalished
// function connected(socket){
//     socket.on('newUser', data => {
//         console.log("New client connected, with id: "+socket.id);
//         users[socket.id] = data;
//         console.log("Starting position: "+users[socket.id].x+" - "+users[socket.id].y);
//         console.log("Current number of users: "+Object.keys(users).length);
//         console.log("players dictionary: ", users);
//         io.emit('updatePlayers', users);
//     })
//     socket.on('disconnect', function(){
//         delete users[socket.id];
//         console.log("Goodbye client with id "+socket.id);
//         console.log("Current number of users: "+Object.keys(users).length);
//         io.emit('updatePlayers', users);
//     })
//     socket.on('ClientClientHello', data => {
//         socket.broadcast.emit('ServerClientHello', data);
//     })
// }