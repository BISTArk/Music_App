const musicContainer = document.getElementById('music-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const cover = document.getElementById('cover');
const title = document.getElementById('title');

const songs = ['janumagale','Tu Jaane Na','Zehnaseeb']

let sindex = 1;

loadsong(songs[sindex]);

function loadsong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function pausesong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function playsong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function prevsong(){
    sindex--;
    if(sindex<0){
        sindex=songs.length-1;
    }
    loadsong(songs[sindex]);
    playsong();
}

function nextsong(){
    sindex++;
    if(sindex>songs.length-1){
        sindex=0;
    }
    loadsong(songs[sindex]);
    playsong();
}

function updateprogress(e){
    const {duration,currentTime} = e.srcElement;
    const played = currentTime * 100 /duration;
    progress.style.width = `${played}%`
}

function setprogress(e){
    const clickX = e.offsetX;
    const duration = audio.duration;
    const width = this.clientWidth;

    console.log(width);
    audio.currentTime = clickX * duration / width;
}

//Event Listeners

playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');

    isPlaying?pausesong():playsong();
})

prevBtn.addEventListener('click',prevsong);

nextBtn.addEventListener('click',nextsong);

audio.addEventListener('timeupdate',updateprogress);

progressContainer.addEventListener('click',setprogress);

audio.addEventListener('ended',nextsong);