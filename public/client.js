const socket =io.connect();
const camera_off = document.querySelector('.camera_icon');
const mic_icon = document.querySelector('.mic_icon');
const form = document.getElementById('send-container');
const messagecontainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('message-input');
const container = document.querySelector('.container');

var mainDiv = document.getElementById("main");

var count =[];
var limit = 5;
var one;
var two;
var id=[];
var history2 = [];
var rect2getx;
var rect2gety;
var numbertext =1;
var get_username;
var createcircleArray =[];
var room =10;
window.onload = function(){  
      

    foruser_local_track();
    // var constraints = {audio:true,video:true};
    // navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
    //     var video = document.querySelector('video');
    //     video.srcObject=mediaStream;
    //     video.play();
    // }).catch(function(err){
    //     console.log('Error on Video Starting');
    // })
}
camera_off.addEventListener('click', toggleCamera_for_local );
mic_icon.addEventListener('click', toggleMic_for_local);
// camera_off.addEventListener('click',function(){
//     var constraints = {audio:false,video:true};
//     navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
//         var video = document.querySelector('video');
//         video.srcObject=mediaStream;
//         video.play();
//     }).catch(function(err){
//         console.log('Error on Video Starting');
//     })
// })
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
socket.on("joinedroom",roomMember=>{
    var total_mem = roomMember.length;
    total_mem++;
    //  alert("i am from Emmeter" +total_mem);
    joinStream();
    // socket.on('send_total_number',data)
    // numbertext =data;
    socket.emit('cirlce_number',total_mem);
});
socket.on("leavedroom",data=>{
    // alert("user Left"+data);
})
socket.on('circle_number_updated',data=>{
    console.log('circle_number : '+data);
    numbertext =data;
    console.log('number value : '+numbertext)
})

let clientRoom;
let userId;
console.log('home All Ids: '+id);
socket.on('rooms', data=>{
    console.log('connected Users: '+data.userno);
    console.log('Room No: '+data.roomNo);
    console.log('userId: '+data.userid);
    
})

socket.on('users',function(data2){
    history2 = data2;
    console.log('i am from history 2  :'+history2.length);
    numbertext = history2.length;
        for(var j =0; j<history2.length; j++){
            if(history2[j]==one){
                console.log('i am from History Var :'+history2[j]);
            }else{
                console.log('i am from else Var :'+history2[j]);
                appendMessage(history2[j]);
            }
            
        }    
})
 socket.on('uservideocall',data=>{
     console.log('video calling: '+data);
 })
socket.on('chat-message',  function(data){
    appendMessage(data);
    
   })

    const ctx = document.getElementById('map');

socket.on('send-userid',usersid =>{
    console.log('user id: '+usersid);
    two=usersid;
})
socket.on('userDeleted',message =>{
    console.log('user disconnected: '+message);
        userdisconnected(message);
    
})
socket.on('circle-created',data=>{
    console.log('cirlce data : '+data)
    var delayInMilliseconds = 1500; //1 second
    setTimeout(function() {
        createcircle(data);
    }, delayInMilliseconds);
    
})
socket.on('removed-circle-from-users',data=>{
        // removecircle();
     })

//hide second person avator
socket.on('hide_avator_second_person',name=>{
    var delayInMilliseconds = 1500;
    setTimeout(function() {
        var second_person_avator_broadcast = document.getElementById(name+"_user_1");
        second_person_avator_broadcast.style.display = "none";
    },delayInMilliseconds);
   
})
socket.on('show_avator_after_meeting_secondp',data=>{
    var second_person_avator_broadcast = document.getElementById(data+"_user_1");
        // second_person_avator_broadcast.style.display = "block";
        
        
})

// send your position..
socket.on('updated_x' , value1=>{
    socket.on('updated_y' , value2=>{
        socket.on('update_user',username=>{
          
            rect2getx=value1;
            rect2gety=value2;
            get_username=username;
            var i;
            usersFound = {}
            for(i=0; i<count.length; i++){
                if(count[i] == username){
                    var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
                    var gtrans = document.getElementById(get_g_id);
                    var attrvalue = "translate("+value1+","+value2+")";
                    var get_rect = document.getElementById(username);
                    get_rect.setAttribute('style','fill: rgb(75, 77, 88);');
                    gtrans.setAttribute("transform",attrvalue);
                    gtrans.style.display="block";
                    socket.on('user-avator-hidden',data=>{
                        var first_person_avator_broadcast_hide = document.getElementById(data+"_user_1");
                        first_person_avator_broadcast_hide.style.display="none";
                    })
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
    container.style.display="none";
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
            g_tag.style.transition="all 2s";
            document.getElementById("map").appendChild(g_tag);
            var createrect = document.createElementNS("http://www.w3.org/2000/svg","rect");
                 createrect.setAttribute("id",gettext);
                 createrect.setAttribute("class", "all_rect");
                 createrect.setAttribute("x",0);
                 createrect.setAttribute("y",0);
                 createrect.setAttribute("width",12);
                 createrect.setAttribute("height",12);
                 createrect.setAttribute("rx",4);
                 createrect.setAttribute('style','fill:lightblue; transform:rotate(45deg);')
            
                 var create_text = document.createElementNS("http://www.w3.org/2000/svg","text");
              
                 create_text.setAttribute("id",gettext+"text");
                 create_text.setAttribute("class","text");
                 create_text.setAttribute("y",25);
                 create_text.setAttribute('x',-12);
                 create_text.setAttribute("style","fill: rgb(75, 77, 88);");
           
                 var newtext = document.createTextNode(gettext);
                 create_text.appendChild(newtext);
                 g_tag.appendChild(createrect);
                 g_tag.appendChild(create_text);
}

function transition(valueX, valueY){
      
}
async function  changeDimensions(click , message) {
   var i=0;
    const get_id = count;
    usersFound ={};
    for(i=0; i<count.length; i++){
        if(count[i]==one){
            var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
            var gtrans = document.getElementById(get_g_id);
            var x = click.clientX;
            var y = click.clientY
            if(x<=150 || y<=150){
                var x = x-10;
                var y = y-10;
            }
            else if(x<=250 || y<=250){
                var x = x-15;
                var y = y-15;
            }
            else if(x>=250 || y>=250){
                var x = x-15;
                var y = y-15;
            }
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
            if(getDistance(getx1, gety1, rect2getx, rect2gety)<5+5){
                socket.emit("join",room);
                socket.emit("memberConnected",one);
                room++;
                joinStream();
                // ++numbertext;
                var delayInMilliseconds = 1500; //1 second
                setTimeout(function() {
                    createcircle(attrvalue);
                    console.log('What is Value of circle: '+attrvalue);
                    console.log('Value of X : and Y: '+x,y);
                    for(i=0; i<count.length; i++){
                        if(count[i]==one){
                            var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
                            var gtrans = document.getElementById(get_g_id);
                            var second_person_avator = document.getElementById(get_username+"_user_1");
                            gtrans.style.display="none";
                                second_person_avator.style.display ="none";
                            socket.emit('hide-user-avator',one);
                        }
                    }
                    }, delayInMilliseconds);
                
                socket.emit('create_cricle',attrvalue);
                socket.emit('circle_username',get_username);
                console.log('userName Get: '+get_username);  
            }
            else if(getDistance(rect2getx, rect2gety, x,y)<25+25){
                socket.emit("join",room);
                socket.emit("memberConnected",one);
                room++;
                // numbertext++;
                joinStream();
                removecircle();
                createcircle(attrvalue);
                // alert('i am from circle calloing');
                for(i=0; i<count.length; i++){
                    if(count[i]==one){
                        var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
                        var gtrans = document.getElementById(get_g_id);
                        gtrans.style.display="none";
                        socket.emit('hide-user-avator',one);
                    }
                }
                socket.emit('create_cricle',attrvalue);
            }
           
            else{
                var second_person_avator = document.getElementById(get_username+"_user_1");
                if(second_person_avator.style.display =="none"){
                    // second_person_avator.style.display ="block";
                    socket.emit('show_avator_after_meeting',get_username);
                }
                
                
                leaveAndRemoveLocalStream();
                for(i=0; i<count.length; i++){
                    if(count[i]==one){
                        var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
                        var gtrans = document.getElementById(get_g_id);
                        gtrans.style.display="block";
                        var get_cricle_value =  document.getElementById('createCirlce');
                         removecircle();
                         numbertext-1;
                           socket.emit('leave',room);
                socket.emit("memberDisconnected",one);
                    }
                }
            }
            console.log('eRrror.....');
        }
       
    }
   
}
function Choose() {
    console.log('click..............');
  }
function createcircle(attrvalue){
   
    var g_tag = document.createElementNS("http://www.w3.org/2000/svg","g");
    g_tag.setAttribute("transform",attrvalue);
    g_tag.setAttribute("data-cy","map-huddle");
    g_tag.setAttribute("class","MapHuddle_mine__18Skp");
    g_tag.setAttribute('id','createCirlce');
    g_tag.setAttribute("style","display:block;");
    g_tag.style.transition="all";
    g_tag.style.transitionDelay="5s";
    document.getElementById("map").appendChild(g_tag);
    var createcricle = document.createElementNS("http://www.w3.org/2000/svg","circle");
    createcricle.setAttribute('class', 'MapHuddle_circle__1MFe2');
    createcricle.setAttribute('r', '20');
    var create_text = document.createElementNS("http://www.w3.org/2000/svg","text");
                create_text.setAttribute('font-size',22);
                create_text.setAttribute('font-family',"Arial");
                create_text.setAttribute('font-weight','600');
                 create_text.setAttribute("class","text");
                 create_text.setAttribute('id','textID')
                 create_text.setAttribute('x',-6);
                 create_text.setAttribute('y',8);
                 create_text.setAttribute("style","fill: #fff; display:block;");
                 var newtext = document.createTextNode(numbertext);
                 create_text.appendChild(newtext);
    g_tag.appendChild(createcricle);
    g_tag.appendChild(create_text);
    let circleclick= document.querySelector('.MapHuddle_mine__18Skp');
}
function removecircle(){
    var get_cricle =  document.getElementById('createCirlce');
        get_cricle.remove();
        socket.emit('remove-cirlce', 'on');
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

mainDiv.addEventListener('click', changeDimensions);
