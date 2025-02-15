console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/O Meri laila.mp3'); // Ensure this file exists
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongname = document.getElementById('masterSongname');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "O'meri laila", filePath: "songs/O Meri laila.mp3", coverPath: "covers/laila.png" },
    { songName: "deva deva", filePath: "songs/deva deva.mp3", coverPath: "covers/deva.png" },
    { songName: "Sahiba", filePath: "songs/Sahiba.mp3", coverPath: "covers/sahiba.png" },
    { songName: "Ishq hai yeh", filePath: "songs/ishq hai.mp3", coverPath: "covers/ishq.png" },
    { songName: "Nadaan Parindey", filePath: "songs/nadaan parindey.mp3", coverPath: "covers/parindey.png" },
    { songName: "mitwa", filePath: "songs/mitwa.mp3", coverPath: "covers/mitwa.png" },
    { songName: "Raanjhan", filePath: "songs/raanjhan.mp3", coverPath: "covers/ranjhaan.png" },
    { songName: "ilahi", filePath: "songs/ilahi.mp3", coverPath: "covers/ilahi.png" },
    { songName: "Teri Deewani", filePath: "songs/Teri Deewani.mp3", coverPath: "covers/deewani.png" },
    { songName: "Tu chahiye", filePath: "songs/Tu chahiye.mp3", coverPath: "covers/tu chahiye.png" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        console.log(audioElement);

        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

    }
})

audioElement.addEventListener('timeupdate', () => {

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('Previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})



document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevents scrolling
        masterPlay.click();
    }
    if (event.code === 'ArrowRight' && event.shiftKey) {
        nextSong(); // Changes to next song when Shift + Right Arrow is pressed
    } else if (event.code === 'ArrowRight') {
        skipForward(); // Moves forward 5 sec
    }
    if (event.code === 'ArrowLeft' && event.shiftKey) {
        prevSong(); // Changes to previous song when Shift + Left Arrow is pressed
    } else if (event.code === 'ArrowLeft') {
        skipBackward(); // Moves backward 5 sec
    }
});

// Functions to change songs
function nextSong() {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    playSong();
}

function prevSong() {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    playSong();
}

function playSong() {
    audioElement.src = songs[songIndex].filePath;
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}

// Functions to seek within the song
function skipForward() {
    if (audioElement.currentTime + 5 <= audioElement.duration) {
        audioElement.currentTime += 5;
    } else {
        audioElement.currentTime = audioElement.duration;
    }
}

function skipBackward() {
    if (audioElement.currentTime - 5 >= 0) {
        audioElement.currentTime -= 5;
    } else {
        audioElement.currentTime = 0;
    }
}


