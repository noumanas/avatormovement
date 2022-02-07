const socket = io.connect();
const messagecontainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-button');
const messageInput = document.getElementById('message-input')
var mainDiv = document.getElementById("main");
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
    // const btn = document.getElementById('btn');
    const ctx = document.getElementById('map');
    // const btn = document.getElementById('btn');
    // btn.addEventListener('click',(e)=>{
    //     const getuser = document.getElementById('input').value;
    // })
// let clientavator = {};
socket.on('chat-message', data =>{
    appendMessage(data)
})
socket.on('updated_x' , value1=>{
    socket.on('updated_y' , value2=>{
        transition(value1,value2);
        console.log(value1, value2);
    })
    
 })

socket.on('user-disconnect', data =>{
    console.log(data);
    var g_tag = document.createElementNS("http://www.w3.org/2000/svg","g");
    g_tag.remove();
})
messageForm.addEventListener('click', e=>{
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message){
    const gettext = message
    var g_tag = document.createElementNS("http://www.w3.org/2000/svg","g");
            g_tag.setAttribute("id",gettext+"_user_1");
            document.getElementById("map").appendChild(g_tag);
            var createrect = document.createElementNS("http://www.w3.org/2000/svg","rect");
                 createrect.setAttribute("id",gettext);
                 createrect.setAttribute("class", "all_rect");
                 createrect.setAttribute("x",0);
                 createrect.setAttribute("y",0);
                 createrect.setAttribute("width",12);
                 createrect.setAttribute("height",12);
                 createrect.setAttribute("rx",2);
                 const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                 animate.setAttribute("id","rect_animate");
                 animate.setAttribute("begin","map.click");
                 const rect_animate_y = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                 rect_animate_y.setAttribute("id","rect_animate_y");
                 rect_animate_y.setAttribute("begin","map.click");
                 //  createrect.setAttribute("style", "fill: rgb(0, 33, 218);");
                 console.log(createrect);
                 createrect.appendChild(animate);
                 createrect.appendChild(rect_animate_y);
                 var create_text = document.createElementNS("http://www.w3.org/2000/svg","text");
                 const text_animate_x = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                 create_text.setAttribute("id",gettext+"text");
                 create_text.setAttribute("class","text");
                 create_text.setAttribute("y",20);
                 create_text.setAttribute("style","fill: rgb(75, 77, 88);");
                 text_animate_x.setAttribute("id","text_animate_x");
                 text_animate_x.setAttribute("begin", "map.click");
             const  text_animate_y = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                 text_animate_y.setAttribute("id","text_animate_y");
                 text_animate_y.setAttribute("begin","map.click");
                 var newtext = document.createTextNode(gettext);
                 create_text.appendChild(newtext);
                 create_text.appendChild(text_animate_x);
                 create_text.appendChild(text_animate_y);
                 g_tag.appendChild(createrect);
                 g_tag.appendChild(create_text);
}
//setting up the environment
// putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight);
// let startX = 40+Math.random()*560;
// let startY = 40+Math.random()*400;
// let playerBall = new Ball(startX, startY, 40, 5);
// playerBall.player = true;
// playerBall.maxSpeed = 5;
// function gameLogic(){}


//sending the initial positions to the server

//reacting for new and disconnecting clients
// btn.addEventListener('click', () =>{
//     socket.emit('newUser', {x: startX, y: startY});
//     socket.on('updatePlayers', players => {
//         const gettext = document.getElementById('input').value;
//         const g_tag = document.createElementNS("http://www.w3.org/2000/svg","g");
//         ctx.appendChild(g_tag);
//         var createrect = document.createElementNS("http://www.w3.org/2000/svg","rect");
//                      createrect.setAttribute("id",gettext);
//                      createrect.setAttribute("x",0);
//                      createrect.setAttribute("y",0);
//                      createrect.setAttribute("width",12);
//                      createrect.setAttribute("height",12);
//                      createrect.setAttribute("rx",2);
//         var create_text = document.createElementNS("http://www.w3.org/2000/svg","text");
//         create_text.setAttribute("id","text");
//         create_text.setAttribute("y",12);
//         create_text.setAttribute("style","fill: rgb(75, 77, 88);");
//         var newtext = document.createTextNode(gettext);
//                      create_text.appendChild(newtext);
//                      g_tag.appendChild(createrect);
//                     g_tag.appendChild(create_text);
//         playersFound = {};
//         for(let id in players){
//             if(clientavator[id] === undefined && id !== socket.id){
//                 clientavator[id] = new Ball (players[id].x, players[id].y, 40, 5);
//             }
//             playersFound[id] = true;
//         }
//         for(let id in clientavator){
//             if(!playersFound[id]){
//                 clientavator[id].remove();
//                 delete clientavator[id];
//             }
//         }
//     })
// })


// function gameLogic(){
//     socket.emit('update', {x: playerBall.pos.x, y: playerBall.pos.y});
// }

// userInput(playerBall);
// requestAnimationFrame(mainLoop);
function transition(valueX, valueY){
    var  rect_get_id = document.getElementsByClassName("all_rect")[0].id;
    var text_get_id = document.getElementsByClassName('text')[0].id;
    var text= document.getElementById(text_get_id);
    var rect = document.getElementById(rect_get_id);
    var getx= rect.getAttribute("x");
    var gety = rect.getAttribute("y");
    var rect_animate = document.getElementById("rect_animate");
    var rect_animate_y = document.getElementById("rect_animate_y");
    var text_animate_x = document.getElementById("text_animate_x");
    var text_animate_y = document.getElementById("text_animate_y");

                rect_animate.setAttribute("attributeName","x");
                rect_animate.setAttribute("dur","3s");
                rect_animate.setAttribute("to",valueX);
                rect_animate.setAttribute("from", getx);
                rect_animate.setAttribute("repeatCount", "linear");
                
                text_animate_x.setAttribute("attributeName","x");
                text_animate_x.setAttribute("dur","3s");
                text_animate_x.setAttribute("to",valueX);
                text_animate_x.setAttribute("from", getx);
                text_animate_x.setAttribute("repeatCount", "linear");

                text_animate_y.setAttribute("dur", "3s");
                text_animate_y.setAttribute("attributeName","y");
                text_animate_y.setAttribute("to", valueY);
                text_animate_y.setAttribute("from", gety);
                text_animate_y.setAttribute("repeatCount", "linear");

                rect_animate_y.setAttribute("dur", "3s");
                rect_animate_y.setAttribute("attributeName","y");
                rect_animate_y.setAttribute("to", valueY);
                rect_animate_y.setAttribute("from", gety);
                rect_animate_y.setAttribute("repeatCount", "linear");
                rect.setAttribute("x", valueX);
                rect.setAttribute("y", valueY);
                text.setAttribute("x", valueX);
                text.setAttribute("y", valueY);
}
function changeDimensions(click , message) {
    const get_id = message;
    var  rect_get_id = document.getElementsByClassName("all_rect")[0].id;
    var text_get_id = document.getElementsByClassName('text')[0].id;
    // var rect2 = document.getElementById
    var text= document.getElementById(text_get_id);
    var rect = document.getElementById(rect_get_id);
    var getx= rect.getAttribute("x");
    var gety = rect.getAttribute("y");
    var x = click.clientX;
    var y = click.clientY;
    var rect_animate = document.getElementById("rect_animate");
    var rect_animate_y = document.getElementById("rect_animate_y");
    var text_animate_x = document.getElementById("text_animate_x");
    var text_animate_y = document.getElementById("text_animate_y");

                rect_animate.setAttribute("attributeName","x");
                rect_animate.setAttribute("dur","3s");
                rect_animate.setAttribute("to",x);
                rect_animate.setAttribute("from", getx);
                rect_animate.setAttribute("repeatCount", "linear");
                
                text_animate_x.setAttribute("attributeName","x");
                text_animate_x.setAttribute("dur","3s");
                text_animate_x.setAttribute("to",x);
                text_animate_x.setAttribute("from", getx);
                text_animate_x.setAttribute("repeatCount", "linear");

                text_animate_y.setAttribute("dur", "3s");
                text_animate_y.setAttribute("attributeName","y");
                text_animate_y.setAttribute("to", y);
                text_animate_y.setAttribute("from", gety);
                text_animate_y.setAttribute("repeatCount", "linear");

                rect_animate_y.setAttribute("dur", "3s");
                rect_animate_y.setAttribute("attributeName","y");
                rect_animate_y.setAttribute("to", y);
                rect_animate_y.setAttribute("from", gety);
                rect_animate_y.setAttribute("repeatCount", "linear");
                rect.setAttribute("x", x);
                rect.setAttribute("y", y);
                text.setAttribute("x", x)
                text.setAttribute("y",y);
 
    console.log(x+"value x");
    console.log(y+"value y");
    socket.emit('value_of_x', x,y);
    socket.emit('value_of_y', y);

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
    console.log(rects);
    console.log(x);
    console.log(y);
    console.log(click.top);
}
ctx.addEventListener('mousedown' , (e) =>{
    getMousePosition(ctx, e)
})
mainDiv.addEventListener('click', changeDimensions, false);