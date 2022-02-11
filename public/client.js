const socket =io.connect();
const messagecontainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-button');
const messageInput = document.getElementById('message-input')
var mainDiv = document.getElementById("main");
var count =[];
var limit = 5;
var one;
socket.emit('newUser', );
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
        socket.on('update_user',username=>{
            var i;
            for(i=0; i<count.length; i++){
                if(count[i] == username){
                    var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[i].id;
                    var gtrans = document.getElementById(get_g_id);
                    var attrvalue = "translate("+value1+","+value2+")";
                    gtrans.setAttribute("transform",attrvalue);
                    console.log('value is is'+username);
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
                 console.log(createrect);
            
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
        var v1=count[0];
        var v2=count[1];
        var v3=count[2];
        var v4=count[3];
        var v5=count[4];
        // if(one === undefined){
        //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[0].id;
        //     var gtrans = document.getElementById(get_g_id);
        //     var attrvalue = "translate("+valueX+","+valueY+")";
        //     gtrans.setAttribute("transform",attrvalue);
        //     console.log('value is is'+one);
        // }
        
        // else if(one ==v2){

        //         var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[0].id;
        //         var gtrans = document.getElementById(get_g_id);
        //         var attrvalue = "translate("+valueX+","+valueY+")";
        //         gtrans.setAttribute("transform",attrvalue);
        //         console.log('value is is'+one);
        //         console.log("second wala calling");
            
        // }
        // else if(one ==v3){
        //     if(one==v1){
        //         var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[0].id;
        //         var gtrans = document.getElementById(get_g_id);
        //         var attrvalue = "translate("+valueX+","+valueY+")";
        //         gtrans.setAttribute("transform",attrvalue);
        //         console.log('value is is'+one);
        //         console.log("third wala calling");
        //     }
        //     if(one==v3){
        //         var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[1].id;
        //         var gtrans = document.getElementById(get_g_id);
        //         var attrvalue = "translate("+valueX+","+valueY+")";
        //         gtrans.setAttribute("transform",attrvalue);
        //         console.log('value is is'+one);
        //         console.log("third wala calling");
        //     }
        //     else{
        //         var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[2].id;
        //         var gtrans = document.getElementById(get_g_id);
        //         var attrvalue = "translate("+valueX+","+valueY+")";
        //         gtrans.setAttribute("transform",attrvalue);
        //         console.log('value is is'+one);
        //         console.log("third wala else calling");
        //     }
            
        // }
        // else if(one==v1){
        //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[2].id;
        //     var gtrans = document.getElementById(get_g_id);
        //     var attrvalue = "translate("+valueX+","+valueY+")";
        //     gtrans.setAttribute("transform",attrvalue);
        //     console.log('value is is'+one);
        //     console.log("third wala else calling");
        // }
        //     else{
        //         var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[1].id;
        //         var gtrans = document.getElementById(get_g_id);
        //         var attrvalue = "translate("+valueX+","+valueY+")";
        //         gtrans.setAttribute("transform",attrvalue);
        //         console.log('value is is'+one);
        //         console.log("else wali calling");
        //     }
    // const get_id = count;
    // var  rect_get_id = document.getElementsByClassName("all_rect")[v].id;
    // var text_get_id = document.getElementsByClassName('text')[v].id;
    // var text= document.getElementById(get_id+"text");
    // var rect = document.getElementById(get_id);
    // var v=0;
    // if(count[0]){
    //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[0].id;
    //         var gtrans = document.getElementById(get_g_id);
    //         var attrvalue = "translate("+value1+","+value2+")";
    //         gtrans.setAttribute("transform",attrvalue);
    //         ++v;
    // }
    // if(count[1]){
    //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[1].id;
    //     var gtrans = document.getElementById(get_g_id);
    //     var attrvalue = "translate("+valueX+","+valueY+")";
    //     gtrans.setAttribute("transform",attrvalue);
    //     ++v;
    // }
    
    // var rect_animate = document.getElementById("rect_animate");
    // var rect_animate_y = document.getElementById("rect_animate_y");
    // var text_animate_x = document.getElementById("text_animate_x");
    // var text_animate_y = document.getElementById("text_animate_y");

    //             rect_animate.setAttribute("attributeName","x");
    //             rect_animate.setAttribute("dur","3s");
    //             rect_animate.setAttribute("to",valueX);
    //             rect_animate.setAttribute("from", getx);
    //             rect_animate.setAttribute("repeatCount", "linear");
                
    //             text_animate_x.setAttribute("attributeName","x");
    //             text_animate_x.setAttribute("dur","3s");
    //             text_animate_x.setAttribute("to",valueX);
    //             text_animate_x.setAttribute("from", getx);
    //             text_animate_x.setAttribute("repeatCount", "linear");

    //             text_animate_y.setAttribute("dur", "3s");
    //             text_animate_y.setAttribute("attributeName","y");
    //             text_animate_y.setAttribute("to", valueY);
    //             text_animate_y.setAttribute("from", gety);
    //             text_animate_y.setAttribute("repeatCount", "linear");

    //             rect_animate_y.setAttribute("dur", "3s");
    //             rect_animate_y.setAttribute("attributeName","y");
    //             rect_animate_y.setAttribute("to", valueY);
    //             rect_animate_y.setAttribute("from", gety);
    //             rect_animate_y.setAttribute("repeatCount", "linear");
    
                // rect.setAttribute("x", valueX);
                // rect.setAttribute("y", valueY);
                // text.setAttribute("x", valueX);
                // text.setAttribute("y", valueY);
}
function changeDimensions(click , message) {
   var v1= count[0];
   var v2=count[1];
   var v3=count[2];
   var v4=count[3];
   var v5=count[4];
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
            console.log("moving user_ "+one);
        }
    }
    // if(v1==one){
      
    //             // console.log('message: '+message);
    // }
    // if(v2==one){
    //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[1].id;
    //             var gtrans = document.getElementById(get_g_id);
    //             var x = click.clientX;
    //             var y = click.clientY;
    //             var attrvalue = "translate("+x+","+y+")";
    //             gtrans.setAttribute("transform",attrvalue);
    //             socket.emit('value_of_x', x,y);
    //             socket.emit('value_of_y', y); 
    //             socket.emit('username',one);
    //             console.log("moving user_ "+one)
    //             i++;
    //             console.log('value of i='+i);
    // }
    // if(v3==one){
    //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[2].id;
    //     var gtrans = document.getElementById(get_g_id); 
    //     var x = click.clientX;
    //     var y = click.clientY;
    //     var attrvalue = "translate("+x+","+y+")";
    //     gtrans.setAttribute("transform",attrvalue);
    //     socket.emit('value_of_x', x,y);
    //     socket.emit('value_of_y', y); 
    //     socket.emit('username',one);
    //     console.log("moving user_ "+one)
    //     i++;
    //     console.log('value of i='+i);
    // }
    // if(v4==one){
    //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[3].id;
    //     var gtrans = document.getElementById(get_g_id); 
    //     var x = click.clientX;
    //     var y = click.clientY;
    //     var attrvalue = "translate("+x+","+y+")";
    //     gtrans.setAttribute("transform",attrvalue);
    //     socket.emit('value_of_x', x,y);
    //     socket.emit('value_of_y', y); 
    //     socket.emit('username',one);
    //     console.log("moving user_ "+one)
    //     i++;
    //     console.log('value of i='+i);
    // }
    // if(v5==one){
    //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[4].id;
    //     var gtrans = document.getElementById(get_g_id); 
    //     var x = click.clientX;
    //     var y = click.clientY;
    //     var attrvalue = "translate("+x+","+y+")";
    //     gtrans.setAttribute("transform",attrvalue);
    //     socket.emit('value_of_x', x,y);
    //     socket.emit('value_of_y', y); 
    //     socket.emit('username',one);
    //     console.log("moving user_ "+one)
    //     i++;
    //     console.log('value of i='+i);
    // }     
                
            
            
        // if(v1==one)
        // {var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[0].id;
        // var gtrans = document.getElementById(get_g_id);
        // var x = click.clientX;
        // var y = click.clientY;
        // var attrvalue = "translate("+x+","+y+")";
        // gtrans.setAttribute("transform",attrvalue);
        // socket.emit('value_of_x', x,y);
        // socket.emit('value_of_y', y); 
        // console.log("moving first user");}
            
        // else if(v2==one){
        //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[1].id;
        //     var gtrans = document.getElementById(get_g_id);
        //     var x = click.clientX;
        //     var y = click.clientY;
        //     var attrvalue = "translate("+x+","+y+")";
        //     gtrans.setAttribute("transform",attrvalue);
        //     socket.emit('value_of_x', x,y);
        //     socket.emit('value_of_y', y); 
        //     console.log("moving second user");
        // }
        // else if(v3==one){
        //     var get_g_id = document.getElementsByClassName('MapUser_MapUser_160Xx')[2].id;
        //     var gtrans = document.getElementById(get_g_id);
        //     var x = click.clientX;
        //     var y = click.clientY;
        //     var attrvalue = "translate("+x+","+y+")";
        //     gtrans.setAttribute("transform",attrvalue);
        //     socket.emit('value_of_x', x,y);
        //     socket.emit('value_of_y', y); 
        //     console.log("moving third user");
        // }
    // if(count[0]){
       
    // }
    // else if(count[1]){
        
    // }
    // else{
    //     console.log('Count not Found!!!');
    // }
        

    
    // var  rect_get_id = document.getElementById(v);
    // var text_get_id = document.getElementById(v);
    // // var rect2 = document.getElementById
    // var text= document.getElementById(get_id+"text");
    // var rect = document.getElementById(get_id);
    // var getx= rect.getAttribute("x");
    // var gety = rect.getAttribute("y");
    // var x = click.clientX;
    // var y = click.clientY;
    // var attrvalue = "translate("+x+","+y+")";
    
    
    // g.setAttribute("y", y);
    // text.setAttribute("x", x)
    // text.setAttribute("y",y);
 
    

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
    // console.log(rects);
    // console.log(x);
    // console.log(y);
    // console.log(click.top);
}
ctx.addEventListener('mousedown' , (e) =>{
    getMousePosition(ctx, e)
})
mainDiv.addEventListener('click', changeDimensions, false);