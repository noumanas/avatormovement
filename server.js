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

let history =[];
let users = {};
let userno = 0;
let roomNo;
let userid;
io.on('connection', connected);
function connected (socket){
            userno+1;
            roomNo =1;
            userid=socket.id;
            socket.join(roomNo);
            socket.emit('rooms', {userno: userno, roomNo: roomNo , userid:userid});
            socket.on('send-chat-message', (message) =>{
            console.log("new user connected with id: "+socket.id);
            users[socket.id] = message;
            history.push(message);
            console.log('user name: '+message)
            socket.emit('users', history);
            console.log('total users: '+Object.keys(users).length);
            socket.broadcast.emit('send-userid', socket.id);
            socket.broadcast.emit('chat-message', message);
            socket.emit('chat-message',message);
        })
    
    socket.on('value_of_x', x =>{
        socket.broadcast.emit('updated_x', x);
    })
    socket.on('value_of_y', y =>{
        socket.broadcast.emit('updated_y', y);
    })
    socket.on('username', username =>{
        socket.broadcast.emit('update_user', username);
    })
    socket.on("send_user_class" ,data=>{
        
    })
    socket.on('disconnect', message =>{
        delete users[socket.id];
        history.pop(message);
        console.log("Goodbye client with id :"+socket.id);
        console.log("Current number of Users: "+Object.keys(users).length);
        socket.broadcast.emit('userDeleted',socket.id);

    })
}

