document.addEventListener('DOMContentLoaded', init, false);

function init(){
    const player = document.getElementById('videoplayer');
    const toggleBtn = document.getElementById('togglebutton');
    const videolist = document.getElementById('videolist');
    
    toggleBtn.addEventListener('click', () => {
        if(player.paused){
            player.play();
        } else {
            player.pause();
        }
    });

    let http = new XMLHttpRequest();
    http.onload = httpHandler;
    http.open("GET", 'http://localhost:3000/list');
    http.send();
}

function httpHandler(){
    if(this.status == 200 && this.responseText != null){
        loadVideos(this.responseText)
    }
}

// expects a string
function loadVideos(data){
    let videoListItem = document.createElement('li');
    let title = document.createTextNode(data);
    videoListItem.appendChild(title);
    videolist.appendChild(videoListItem);
    videoListItem.addEventListener('click', ()=>{
       document.querySelector("#videoplayer > source").src = `http://localhost:3000/video`; 
    });
}