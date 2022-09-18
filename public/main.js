const APP_ID ="6c9da57d6d0348eaa4680b134779b5b0"
const TOKEN = "0066c9da57d6d0348eaa4680b134779b5b0IAAO3Qs1R1qvK6632lAa5XXvmXs1ndNMiN3BBi/nMSS1fGTNKL8AAAAAEAC5bVGztN6pYgEAAQCz3qli"
const CHANNEL ="main"




let client = AgoraRTC.createClient({mode:'rtc', codec:'h264'});
// client.init("6c9da57d6d0348eaa4680b134779b5b0", function() {
//     console.log("client initialized");
// }, function(err) {
//     console.log("client init failed ", err);
// });
const screenClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
var localTracks = {
    videoTrack: null,
    audioTrack: null
  };
var localscreenTrack;
let remoteUsers = {}
let UID;
let joinAndDisplayLocalStream = async () => {

    client.on('user-published', handleUserJoined)
    
    client.on('user-left', handleUserLeft)
    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    let player = `<div class="video-container" id="user-container-${UID}">
    <div class="username">${one}</div>
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)
    
    await client.publish([localTracks[0], localTracks[1]]);

}
// async function startScreenCall() {
  
//     const screenTrack  = await AgoraRTC.createScreenVideoTrack();
//     let player = `<div class="video-container" id="user-container-${UID}" style="border-radius: 2%">
//                         <div class="video-player" id="user-${UID}"></div>
//                   </div>`
//     document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
//     // await client.publish(screenTrack);
//     localTracks[1].play(`user-${UID}`)
//   }
  
let foruser_local_track = async () => {

    // client.on('user-published', handleUserJoined)
    
    // client.on('user-left', handleUserLeft)
    
    

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 

    let player = `<div class="video-local_container">
                        <div class="video-player1" id="user-${UID}"></div>
                  </div>`
    document.getElementById('local_video').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)
    

}
async function screensharing() {
    // screenClient.on('user-left', handleUserLeft)
  
    await screenClient.join(APP_ID, CHANNEL, TOKEN, null);
    localscreenTrack =1;
    const screenTrack = await AgoraRTC.createScreenVideoTrack();
    // screenTrack.videoTrack.on("track-ended",handleTrackEnded);
    await screenClient.publish(screenTrack);
  
    return screenClient;
  }
let joinStream = async () => {
    await joinAndDisplayLocalStream()
    // document.getElementById('join-btn').style.display = 'none'
    document.getElementById('stream-controls').style.display = 'flex'
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user 
    await client.subscribe(user, mediaType)
   

    if (mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null){
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div> 
                 </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        user.videoTrack.play(`user-${user.uid}`)
    }

    if (mediaType === 'audio'){
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove();
    
}

let leaveAndRemoveLocalStream = async () => {
    for(let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
        
    }
    

    await client.leave()
    document.getElementById('stream-controls').style.display = 'none'
    document.getElementById('video-streams').innerHTML = ''
}
let leaveconnection = async () =>{
    handleUserLeft();
}

let toggleMic = async (e) => {
    if (localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.innerText = 'Mic on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[0].setMuted(true)
        e.target.innerText = 'Mic off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

  

let toggleCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.innerText = 'Camera on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[1].setMuted(true)
        e.target.innerText = 'Camera off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}
let toggleMic_for_local = async (e) => {
    if (localTracks[0].muted){
        await localTracks[0].setMuted(false)
        mic_icon.style.backgroundColor = '#fff'
        const mic_muted_notification =document.getElementById('mic_muted_notification');
        const mic = document.getElementById('mic');
        mic.setAttribute('src','assets/Mic_On.svg');
        mic_muted_notification.style.display ="none";

    }else{
        await localTracks[0].setMuted(true)
        mic_icon.style.backgroundColor = 'red'
        const mic_muted_notification =document.getElementById('mic_muted_notification');
        const mic = document.getElementById('mic');
        mic.setAttribute('src','assets/Mic_Off.svg');
        mic_muted_notification.style.display = "block";
    }
}
let toggleMic_for_stream = async (e) => {
    if (localTracks[0].muted){
        await localTracks[0].setMuted(false)
        stream_mic_icon.style.backgroundColor = '#0066EB'
        stream_mic_icon.classList.add('btn-one-shadow');
        const mic_muted_notification =document.getElementById('mic_muted_notification');
        const mic = document.getElementById('stream-mic');
        mic.setAttribute('src','assets/mic.png');
        mic_muted_notification.style.display ="none";

    }else{
        await localTracks[0].setMuted(true)
        stream_mic_icon.style.backgroundColor = 'red'
        stream_mic_icon.classList.remove('btn-one-shadow');
        const mic_muted_notification =document.getElementById('mic_muted_notification');
        const mic = document.getElementById('stream-mic');
        mic.setAttribute('src','assets/Mic_Off.svg');
        mic_muted_notification.style.display = "block";
    }
}

let toggleCamera_for_local = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        camera_off.style.backgroundColor = '#fff'
        const cam = document.getElementById('cam');
        cam.setAttribute('src','assets/Camera_On.svg');
        
    }else{
        await localTracks[1].setMuted(true)
        camera_off.style.backgroundColor = 'red'
        const cam = document.getElementById('cam');
        cam.setAttribute('src','assets/Camera_Off.svg');
    }
}
let toggleCamera_for_stream = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        stream_camera_off.style.backgroundColor = '#0066EB'
        stream_camera_off.classList.add('btn-one-shadow');
        const cam = document.getElementById('video-cam');
        cam.setAttribute('src','assets/cam_2_2.png');
        
    }else{
        await localTracks[1].setMuted(true)
        stream_camera_off.style.backgroundColor = 'red'
        stream_camera_off.classList.remove('btn-one-shadow');
        const cam = document.getElementById('video-cam');
        cam.setAttribute('src','assets/Camera_Off.svg');
    }
}
let ScreenSharingToggle = async(e) =>{
    if(localscreenTrack == 1){
        // await screenTrack[0].setMuted(false)
        stream_screen_share.style.backgroundColor ='#0066EB';
        stream_screen_share.classList.add('btn-one-shadow');
        localscreenTrack=0;
        console.log('i am from if condition');
        screenClient.leave();
    }
    else{
        stream_screen_share.style.backgroundColor ='#35DF04';
        stream_screen_share.classList.remove('btn-one-shadow');
        screensharing();
        console.log('i am from  else');
    }
}
function handleTrackEnded() {

    var track = screenTrack["videoTrack"];
    if(track) {
      track.stop();
      track.close();
      screenTrack["videoTrack"] = undefined;
    }
    screenClient.unpublish(track);
    console.log("handleTrackEnded");
}
  

// document.getElementById('join-btn').addEventListener('click', joinStream)
// document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.querySelector('.stream_mic_icon').addEventListener('click',  toggleMic_for_stream)
document.querySelector('.stream_camera_icon').addEventListener('click', toggleCamera_for_stream)
document.getElementById('screen-share-btn').addEventListener('click',ScreenSharingToggle)