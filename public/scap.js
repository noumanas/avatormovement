var ctx = document.getElementById("map");
             var btn = document.getElementById("btn");
             var mainDiv = document.getElementById("main");
            //  var value =1;
            //  var value2 =5;
            async function videocam(){ 
                let video = document.getElementById("video");
                if(navigator.mediaDevices.getUserMedia){
                   await navigator.mediaDevices.getUserMedia({video:true})
                    .then(function(s){
                        video.srcObject = s;
                    })
                }
                else{
                    console.log("no");
                }
            }
            function cameraoff() {
                const stream = video.srcObject;
                if (stream) {
                const tracks = stream.getTracks();

                tracks.forEach(function (track) {
                    track.stop();
                });

                video.srcObject = null;
                }
            }
        function createavator(){
            const user ="user";
            const gettext = document.getElementById("input").value;
            var g_tag = document.createElementNS("http://www.w3.org/2000/svg","g");
            g_tag.setAttribute("id",gettext+"user_1");
            document.getElementById("map").appendChild(g_tag);
            var createrect = document.createElementNS("http://www.w3.org/2000/svg","rect");
                 createrect.setAttribute("id","rect1");
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
                create_text.setAttribute("id","text");
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
                //  ctx.appendChild(createrect);
        
        }
        
            
                 
            
            function changeDimensions(click) {
                var  rect = document.getElementById("rect1");
                var rect2 = document.getElementById("Noman");
                var text= document.getElementById("text");
                // var line = document.getElementById("line");
                var rect_animate = document.getElementById("rect_animate");
                var rect_animate_y = document.getElementById("rect_animate_y");
                var text_animate_x = document.getElementById("text_animate_x");
                var text_animate_y = document.getElementById("text_animate_y");
                var getx = rect.getAttribute("x");
                var gety= rect.getAttribute("y");
                var rect2_getx = rect2.getAttribute("x");
                var rect2_gety = rect2.getAttribute("y");
                var rect_radius = rect.getAttribute("rx");
                var rect2_radius = rect2.getAttribute("rx");
                var x = click.clientX;
                var y = click.clientY;
                console.log(x+"value x");
                console.log(y+"value y")
                // var getx = rect.getAttribute("x");
                // var gety= rect.getAttribute("y");
                // var endp = x+y;
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
                // line.setAttribute("x1",getx);
                // line.setAttribute("y1",gety);
                // line.setAttribute("x2",x);
                // line.setAttribute("y2" ,y);
                // ctx.appendChild(line);
                rect.setAttribute("x", x);
                rect.setAttribute("y", y);
                text.setAttribute("x", x);
                text.setAttribute("y", y);
                if(getx >= rect2_getx && getx <= rect2_getx && gety >= rect2_gety && gety <= rect2_gety){
                    console.log('Colliding');
                }
                if(getDistance(getx, gety, rect2_getx, rect2_gety)<rect_radius+ rect2_radius){
                   
                    videocam();
                    console.log("collapse");
                 
                }
                else{
                    cameraoff();
                    console.log("error.....");
                }
                // console.log(getDistance(getx, gety, rect2_getx, rect2_gety));
            }
            function startanimation(){
                if(timerFunction ==  null){
                    timerFunction= setInterval(animate, 1);
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
                console.log(rects);
                console.log(x);
                console.log(y);
                console.log(click.top);
            }
            ctx.addEventListener('mousedown' , (e) =>{
                getMousePosition(ctx, e)
            })
            mainDiv.addEventListener('click', changeDimensions, false);
            // var svgElement = document.getElementById("Noman");
            // svgElement.addEventListener("click", changeDimensions);
            // var scond = document.getElementById("qureshi");
            // scond.addEventListener('click',changeDimensions);
            // var scond = document.getElementById("rect1");
            // scond.addEventListener('click',changeDimensions);
            btn.addEventListener("click", createavator);