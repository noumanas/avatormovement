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
const socket =io.connect();
const camera_off = document.querySelector('.camera_icon');
const mic_icon = document.querySelector('.mic_icon');
const stream_camera_off = document.querySelector('.stream_camera_icon');
const stream_mic_icon = document.querySelector('.stream_mic_icon');
const stream_screen_share = document.getElementById('screen-share-btn');
const map_show_hide =document.querySelector('.map-show-hide');
const form = document.getElementById('send-container');
const messagecontainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('message-input');
const container = document.querySelector('.container');

var mainDiv = document.getElementById("main");

window.addEventListener('load',()=>{
    const room = getQString(location.href, 'room');
    const username = sessionStorage.getItem('username');

    if(!room){
        document.querySelector( '#room-create' ).attributes.removeNamedItem( 'hidden' );
    }
    else if ( !username ) {
        document.querySelector( '#username-set' ).attributes.removeNamedItem( 'hidden' );
        socket.emit('send-chat-message', username );
    }
    else{
        mainDiv.style.display="block";
        socket.emit('send-chat-message', username );
        one=username;
        console.log('meesage chekcing : '+one);
        socket.emit("join",room);
        
    }
});





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
camera_off.addEventListener('click', toggleCamera_for_local );
mic_icon.addEventListener('click', toggleMic_for_local);

localStorage.setItem('all',JSON.stringify(history2));
const values = localStorage.getItem('all')
console.log('i am from localStorage : ',values[0] );
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
socket.on('chat-message',  function(data){
    appendMessage(data);
    create_attendes_list(data);
   })
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
// socket.on('rooms', data=>{
//     console.log('connected Users: '+data.userno);
//     console.log('Room No: '+data.roomNo);
//     console.log('userId: '+data.userid);
    
// })


socket.on('users',function(data2){
    history2 = data2;
    console.log('i am from history 2  :'+history2.length);
    numbertext = history2.length;
        for(var j =0; j<history2.length; j++){
            if(history2[j]==one){
                console.log('i am from History Var :'+history2[j]);
                
            }else{
                console.log('i am from else Var :'+history2[j]);
                if(history2.length ==3 || history2.length >2);{
                    appendMessage(history2[j]);
                    create_attendes_list(history2[j]);
                }
                    
                   
                
                    
            }
            
        }    
})
 socket.on('uservideocall',data=>{
     console.log('video calling: '+data);
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
    createRoomLink();
    // const message = messageInput.value;
    // one=message;
    // console.log('meesage chekcing : '+one);
    // messageInput.value = ''
    // mainDiv.style.display="block";
    // form.style.display="none";
    // container.style.display="none";
    // document.getElementById('stream-controls').style.display = 'flex'
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
            var attends_user_id = document.getElementsByClassName('attend_user')[i].id;
            var attends_user = document.getElementById(attends_user_id);
            attends_user.remove();
            id.pop(userid);
           console.log("disconnected this User: "+userid)
        }
        
    }
}
//create avator with name 
function appendMessage(message){
    
    const gettext = message;
    count.push(message);
    console.log(count);
    id.push(two);
    console.log('all Id:'+id);
    var g_tag = document.createElementNS("http://www.w3.org/2000/svg","g");
            g_tag.setAttribute("id",gettext+"_user_1");
            g_tag.setAttribute("transform",`translate(650,450)`);
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
                 createrect.setAttribute("rx",2);
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
//avator walking function 
 function  changeDimensions(click , message) {
   var i=0;
    const get_id = count;
    usersFound ={};
    for(i=0; i<count.length; i++){
        if(count[i]==one){
            var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
            var gtrans = document.getElementById(get_g_id);
            var x = click.clientX;
            var y = click.clientY
            console.log('get x Value :'+x);
            console.log('get Y Value: '+y);
            if(x>=1 || y>=1){
                var x = x-0;
                var y = y-7;
            }
            // else if(x<=150 || y<=150){
            //     var x = x-50;
            //     var y = y-50;
            // }
            // else if(x<=250 || y<=250){
            //     var x = x-80;
            //     var y = y-80;
            // }
            // else if(x<=350 || y<=350){
            //     var x = x-110;
            //     var y = y-110;
            // }
            // else if(x<=450 || y<=450){
            //     var x = x-140;
            //     var y = y-140;
            // }
            // else if(x<=550 || y<=550){
            //     var x = x-170;
            //     var y = y-170;
            // }
            // if(x<=150 || y<=150){
            //     var x = x-10;
            //     var y = y-10;
            // }
            // else if(x<=250 || y<=250){
            //     var x = x-15;
            //     var y = y-15;
            // }
            // else if(x>=250 || y>=250){
            //     var x = x-15;
            //     var y = y-15;
            // }
            getx1 = x;
            gety1=y;
            console.log('x1: '+getx1);
            console.log('y1: '+gety1);
            console.log('x2: '+rect2getx);
            console.log('y2: '+rect2gety);
            var attrvalue = "translate("+getx1+","+gety1+")";
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
                let num =5;
                let circleclick= document.querySelector('.MapHuddle_mine__18Skp')[1].replaceChild(newtext,num);
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
                    second_person_avator.style.display ="block";
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
  //create Circle function 
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
const main =  document.querySelector('.main');
const strean_wrapper = document.querySelector('.stream-wrapper');

map_show_hide.onclick = function() {
main.classList.toggle('active');
strean_wrapper.classList.toggle('active');
map_show_hide.classList.toggle('active');
}
mainDiv.addEventListener('click', changeDimensions);
// map_show_hide.addEventListener('click',mapshowhide())
function generateRandomString() {
    const crypto = window.crypto || window.msCrypto;
    let array = new Uint32Array(1);
    
    return crypto.getRandomValues(array);
}

function createRoomLink(){

    let roomName = document.querySelector( '#room-name' ).value;
    let yourName = document.querySelector( '#message-input' ).value;
    
    if ( roomName && yourName ) {
        //remove error message, if any
        document.querySelector('#err-msg').innerText = "";
        
        //save the user's name in sessionStorage
        sessionStorage.setItem( 'username', yourName );

        //create room link
        let roomLink = `${ location.origin }?room=${ roomName.trim().replace( ' ', '_' ) }_${ generateRandomString() }`;
        //show message with link to room
        document.querySelector( '#room-created' ).innerHTML = `Room successfully created. Click <a href='${ roomLink }'>here</a> to enter room. 
            Share the room link with your partners.`;

        //empty the values
        document.querySelector( '#room-name' ).value = '';
        document.querySelector( '#message-input' ).value = '';
    }

    else {
        document.querySelector('#err-msg').innerText = "All fields are required";
    }
} 

document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
    e.preventDefault();

    let name = document.querySelector( '#username' ).value;

    if ( name ) {
        //remove error message, if any
        document.querySelector('#err-msg-username').innerText = "";

        //save the user's name in sessionStorage
        sessionStorage.setItem( 'username', name );

        //reload room
        location.reload();
    }

    else {
        document.querySelector('#err-msg-username').innerText = "Please input your name";
    }
} );
function getQString( url = '', keyToReturn = '' ) {
    url = url ? url : location.href;
    let queryStrings = decodeURIComponent( url ).split( '#', 2 )[0].split( '?', 2 )[1];

    if ( queryStrings ) {
        let splittedQStrings = queryStrings.split( '&' );

        if ( splittedQStrings.length ) {
            let queryStringObj = {};

            splittedQStrings.forEach( function ( keyValuePair ) {
                let keyValue = keyValuePair.split( '=', 2 );

                if ( keyValue.length ) {
                    queryStringObj[keyValue[0]] = keyValue[1];
                }
            } );

            return keyToReturn ? ( queryStringObj[keyToReturn] ? queryStringObj[keyToReturn] : null ) : queryStringObj;
        }

        return null;
    }

    return null;
}
