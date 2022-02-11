const socket =io.connect();
const messagecontainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-button');
const messageInput = document.getElementById('message-input')
var mainDiv = document.getElementById("main");
var count =[];
var limit = 5;
var one;
socket.emit('newUser', );

    const ctx = document.getElementById('map');
socket.on('chat-message', data =>{
    appendMessage(data)
})
// send your position..
socket.on('updated_x' , value1=>{
    socket.on('updated_y' , value2=>{
        socket.on('update_user',username=>{
            var i;
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

socket.on('user-disconnect', data =>{
    // console.log(data);
    // var get_g_id = document.querySelector('g')[0];
    // get_g_id.remove();
})
messageForm.addEventListener('click', e=>{
    e.preventDefault()
    const message = messageInput.value
    one=message;
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})
//
function appendMessage(message){
    
    const gettext = message;
    count.push(message);
    
    // console.log('Counter '+count);
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
                 createrect.setAttribute("rx",2);
            
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
    for(i=0; i<count.length; i++){
        if(count[i]==one){
            var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
            var gtrans = document.getElementById(get_g_id);
            var x = click.clientX;
            var y = click.clientY;
            var attrvalue = "translate("+x+","+y+")";
            gtrans.setAttribute("transform",attrvalue);
            socket.emit('value_of_x', x,y);
            socket.emit('value_of_y', y); 
            socket.emit('username',one);
        }
    }
   
}
function getDistance(x1, y1, x2, y2){
    let xDistance = x2-x1;
    let yDistance = y2-y1;
    let total= Math.sqrt(Math.pow(xDistance, 2)+ Math.pow(yDistance,2))
    console.log("total = "+ total);
    return total;
}
function getMousePosition(click){
    let rects = mainDiv.getBoundingClientRect();
    var x = click.clientX - rects.offsetWidth/2 ;
    var y = click.clientY - rects.offsetheight/2;
}
ctx.addEventListener('mousedown' , (e) =>{
    getMousePosition(ctx, e)
})
mainDiv.addEventListener('click', changeDimensions, false);