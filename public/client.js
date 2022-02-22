const socket =io.connect();
const form = document.getElementById('send-container');
const messagecontainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-button');
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById('message-input');
var mainDiv = document.getElementById("main");
var count =[];
var limit = 5;
var one;
var two;
var id=[];
var history2 = [];
var rect2getx;
var rect2gety;

// async function videocam(){
//     let video = document.getElementById("video");
//     if(navigator.mediaDevices.getUserMedia){
//        await navigator.mediaDevices.getUserMedia({video:true})
//         .then(function(s){
//             video.srcObject = s;
//         })
//     }
//     else{
//         console.log("no");
//     }
// }
// function cameraoff() {
//     const stream = video.srcObject;
//     if (stream) {
//     const tracks = stream.getTracks();

//     tracks.forEach(function (track) {
//         track.stop();
//     });

//     video.srcObject = null;
//     }
// }

let clientRoom;
let userId;
console.log('home All Ids: '+id);
socket.on('rooms', data=>{
    console.log('connected Users: '+data.userno);
    console.log('Room No: '+data.roomNo);
    console.log('userId: '+data.userid);
    
})
// socket.on('users',history =>{
//     console.log('users from server: '+history);
//     // history2.push(history);
    
// })

socket.on('users',function(data2){
    history2 = data2;
    console.log(history2);
        for(var j =0; j<history2.length; j++){
            if(history2[j]!=one){
                console.log(history2[j]);
                appendMessage(history2[j]);
            }
            
        }    
})
 socket.on('uservideocall',data=>{
     console.log('video calling: '+data);
     joinStream();
 })
socket.on('chat-message',  function(data){
    appendMessage(data);
   })

    const ctx = document.getElementById('map');
// socket.on('chat-message', data =>{
//     for(var i = 0; i<history.length; i++){
//         appendMessage(data[i]);
//     }
    
// })
socket.on('send-userid',usersid =>{
    console.log('user id: '+usersid);
    two=usersid;
})
socket.on('userDeleted',message =>{
    console.log('user disconnected: '+message);
        userdisconnected(message);
    
})

// send your position..
socket.on('updated_x' , value1=>{
    socket.on('updated_y' , value2=>{
        socket.on('update_user',username=>{
            rect2getx=value1;
            rect2gety=value2;
            var i;
            usersFound = {}
            for(i=0; i<count.length; i++){
                if(count[i] == username){
                    var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
                    var gtrans = document.getElementById(get_g_id);
                    var attrvalue = "translate("+value1+","+value2+")";
                    gtrans.setAttribute("transform",attrvalue);
                }
            }
           
        })     
    })
    
 })
messageForm.addEventListener('click', e=>{
    e.preventDefault()
    const message = messageInput.value;
    one=message;
    socket.emit('send-chat-message', message );
    messageInput.value = ''
    mainDiv.style.display="block";
    form.style.display="none";
})
function userdisconnected(userid){
    console.log(userid);
    
    var i=1;
    const get_id = count;
    usersFound ={};
    for(i=1; i<id.length; i++){
        if(id[i]== userid){
            var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
            var gtrans = document.getElementById(get_g_id);
            gtrans.remove();
            id.pop(userid);
           console.log("disconnected this User: "+userid)
        }
        
    }
}
//
function appendMessage(message){
    
    const gettext = message;
    count.push(message);
    id.push(two);
    console.log('all Id:'+id);
    var g_tag = document.createElementNS("http://www.w3.org/2000/svg","g");
            g_tag.setAttribute("id",gettext+"_user_1");
            g_tag.setAttribute("transform",`translate(0,0)`);
            g_tag.setAttribute("data-cy","map_user_me");
            g_tag.setAttribute("class","MapUser_MapUser_160Xx");
            g_tag.setAttribute('onClick','Choose();');
            g_tag.style.transition="all 2s";
            document.getElementById("map").appendChild(g_tag);
            var createrect = document.createElementNS("http://www.w3.org/2000/svg","rect");
                 createrect.setAttribute("id",gettext);
                 createrect.setAttribute("class", "all_rect");
                 createrect.setAttribute("x",12);
                 createrect.setAttribute("y",-2);
                 createrect.setAttribute("width",12);
                 createrect.setAttribute("height",12);
                 createrect.setAttribute("rx",4);
            
                 var create_text = document.createElementNS("http://www.w3.org/2000/svg","text");
              
                 create_text.setAttribute("id",gettext+"text");
                 create_text.setAttribute("class","text");
                 create_text.setAttribute("y",20);
                 create_text.setAttribute("style","fill: rgb(75, 77, 88);");
           
                 var newtext = document.createTextNode(gettext);
                 create_text.appendChild(newtext);
                 g_tag.appendChild(createrect);
                 g_tag.appendChild(create_text);
}

function transition(valueX, valueY){
      
}
function changeDimensions(click , message) {
   var i=0;
    const get_id = count;
    usersFound ={};
    for(i=0; i<count.length; i++){
        if(count[i]==one){
            var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
            var gtrans = document.getElementById(get_g_id);
            // get_value = gtrans.getAttribute('transform').split('translate(' , );
            // both_value = get_value[1].split(',',2);
            // rect2X= both_value[0];
            // rect2Y=both_value[1].split(')',1);
            // console.log('value of x : '+rect2X);
            // console.log('value of Y : '+rect2Y);
            // console.log(both_value)
            var x = click.clientX;
            var y = click.clientY;
            getx1 = x;
            gety1=y;
            console.log('x1: '+getx1);
            console.log('y1: '+gety1);
            console.log('x2: '+rect2getx);
            console.log('y2: '+rect2gety);
            var attrvalue = "translate("+x+","+y+")";
            gtrans.setAttribute("transform",attrvalue);
            socket.emit('value_of_x', x,y);
            socket.emit('value_of_y', y); 
            socket.emit('username',one);
            if(getDistance(getx1, gety1, rect2getx, rect2gety)<10+ 10){
                joinStream();
                // socket.emit('VideoCallon', 'on')
                console.log("collapse");     
            }
            else{
                leaveAndRemoveLocalStream();
                    console.log('eRrror.....')
            }
            
        }
        usersFound[i] =true;
    }
    // var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[1].id;
    // var gtrans = document.getElementById(get_g_id);
    // get_value = gtrans.getAttribute('transform').split('translate(' , );
    // both_value = get_value[1].split(',',2);
    // rect2X= both_value[0];
    // rect2Y=both_value[1].split(')',1);
    // console.log('value of x : '+rect2X);
    // console.log('value of Y : '+rect2Y);
    // console.log(both_value);
    // if(getDistance(getx1, gety1, rect2X, rect2Y)<2+ 2){
                   
    //     console.log("collapse");
     
    // }
    // else{
    //     console.log('eRrror.....')
    // }
   
}
function Choose() {
    console.log('click..............');
  }

function videocalling(){
    console.log('video calling start');
}
function getDistance(x1, y1, x2, y2){
    let xDistance = x2-x1;
    let yDistance = y2-y1;
    let total= Math.sqrt(Math.pow(xDistance, 2)+ Math.pow(yDistance,2))
    console.log("total = "+ total);
    return total;
}
// function getMousePosition(click){
//     let rects = mainDiv.getBoundingClientRect();
//     var x = click.clientX - rects.offsetWidth/2 ;
//     var y = click.clientY - rects.offsetheight/2;
// }
// ctx.addEventListener('mousedown' , (e) =>{
//     getMousePosition(ctx, e)
// })
mainDiv.addEventListener('click', changeDimensions);
