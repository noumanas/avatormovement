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
let roomMember = [];
let get_username =[];
io.on('connection', connected);
function connected (socket){
    
            socket.on("join",room=>{
                socket.join(room)
                roomNo=room;
            })
            socket.on("memberConnected", member=>{
                roomMember.push(member);
                console.log('Room Member List: '+roomMember.length);
                socket.to(roomNo).emit("joinedroom",roomMember);
            })
            socket.on("leave",room=>{
                socket.leave(room);
               console.log('Room Member List: '+roomMember );
            })
            socket.on("memberDisconnected", data=>{
                roomMember.pop(data);
                socket.to(roomNo).emit("leavedroom",data);
            })
            // userno+1;
            // roomNo =1;
            userid=socket.id;
            // socket.join(roomNo); 
            // socket.emit('rooms', {userno: userno, roomNo: roomNo , userid:userid});
            socket.on('send-chat-message', (message) =>{
            console.log("new user connected with id: "+socket.id);
            users[socket.id] = message;
            history.push(message);
            console.log('user name: '+message)
            socket.emit('users', history);
            console.log('total users: '+Object.keys(users).length);
            socket.broadcast.emit('send_total_number',Object.keys(users).length)
            socket.broadcast.emit('send-userid', socket.id);
            socket.broadcast.emit('chat-message', message);
            socket.emit('chat-message',message);
        })
        socket.on('VideoCallon',data=>{
            socket.broadcast.emit('uservideocall',data)
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
    socket.on('create_cricle',data=>{
        socket.broadcast.emit('circle-created',data);
        socket.on('circle_username',data1=>{
            socket.broadcast.emit('hide_avator_second_person',data1)
            get_username = data1;
        })
        // socket.join(get_username);
        
        // socket.broadcast.to(get_username).emit('video-calling',get_username);
    })
    socket.on('hide-user-avator',data=>{
        socket.broadcast.emit('user-avator-hidden',data);
        console.log('from data'+data);
    })
    socket.on('remove-cirlce', data=>{
        socket.broadcast.emit('removed-circle-from-users',data)
    })
    socket.on('show_avator_after_meeting',data=>{
        socket.broadcast.emit('show_avator_after_meeting_secondp',data)
    })
    socket.on('cirlce_number',data=>{
        socket.broadcast.emit('circle_number_updated',data)
    })
    socket.on('disconnect', message =>{
        delete users[socket.id];
        history.pop(message);
        console.log("Goodbye client with id :"+socket.id);
        console.log("Current number of Users: "+Object.keys(users).length);
        socket.broadcast.emit('userDeleted',socket.id);

    })
}