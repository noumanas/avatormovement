const APP_ID ="6c9da57d6d0348eaa4680b134779b5b0"
const TOKEN = "0066c9da57d6d0348eaa4680b134779b5b0IAB4wXyuwpksdWsf4SQ9xt2ZmREz2cmteZg4yGXxm5K6pWTNKL8AAAAAEADnfDPKDnI5YgEAAQANcjli"
const CHANNEL ="main"



let client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'});
// client.init("6c9da57d6d0348eaa4680b134779b5b0", function() {
//     console.log("client initialized");
// }, function(err) {
//     console.log("client init failed ", err);
// });
let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {

    client.on('user-published', handleUserJoined)
    
    client.on('user-left', handleUserLeft)
    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 

    let player = `<div class="video-container" id="user-container-${UID}" style="border-radius: 2%">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)
    
    await client.publish([localTracks[0], localTracks[1]])

}
let foruser_local_track = async () => {

    // client.on('user-published', handleUserJoined)
    
    // client.on('user-left', handleUserLeft)
    
    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 

    let player = `<div class="video-local_container">
                        <div class="video-player1" id="user-${UID}"></div>
                  </div>`
    document.getElementById('local_video').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)
    
    await client.publish([localTracks[0], localTracks[1]])

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
    document.getElementById(`user-container-${user.uid}`).remove()
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

// document.getElementById('join-btn').addEventListener('click', joinStream)
// document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mic-btn').addEventListener('click', toggleMic)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)