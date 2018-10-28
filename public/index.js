document.addEventListener('DOMContentLoaded', init, false);

function init(){
    this.player = document.getElementById('videoplayer');
    this.toggleBtn = document.getElementById('togglebutton');
    
    player.addEventListener('click', this.playControl)
}

function playControl(){
    if(this.player.paused()){
        this.player.play();
    } else {
        this.player.pause();
    }
}