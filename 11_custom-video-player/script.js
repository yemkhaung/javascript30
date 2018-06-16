const player = document.querySelector('.player');
const playBtn = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const skipCtrls = document.querySelectorAll('.player__button[data-skip]');
const slideCtrls = document.querySelectorAll('input[type="range"].player__slider');
const fullscreenCtrl = document.querySelector('.fullscreen-control');

const video = document.querySelector('.player__video');
console.dir(video);

function handleTimeUpdate() {
    progressFilled.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
}

function togglePlay(e) {
    video.paused ? video.play() : video.pause();
    // update button
    playBtn.textContent = video.paused ? '►' : '▎▎';
}

function handleSkip() {
    // currentTime is in seconds
    video.currentTime += parseFloat(this.dataset.skip);
}

// volume and playBack controls
function handleSlide(e) {
    video[e.target.name] = e.target.value;
}

function handleProgress(e) {
    // calculate progress at clicked position
    const progressUpdate = (e.offsetX / progress.offsetWidth) * 100;
    // update flex-basis styles
    progressFilled.style.flexBasis = `${progressUpdate}%`;
    // update video's current time
    video.currentTime = progressUpdate * video.duration / 100;
}

function handleFullscreen() {
    player.classList.toggle('fullscreen');
    video.classList.toggle('fullscreen');
}

// video time update event
video.addEventListener('timeupdate', handleTimeUpdate);

// Controls events
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
skipCtrls.forEach(ctrl => ctrl.addEventListener('click', handleSkip));

let isMouseDown = false;

// progress bar events
progress.addEventListener('click', handleProgress);
progress.addEventListener('mousemove', (e) => isMouseDown && handleProgress(e));
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);

// volume and playBack slide events
slideCtrls.forEach(ctrl => ctrl.addEventListener('click', handleSlide));
slideCtrls.forEach(ctrl => ctrl.addEventListener('mousemove', (e) => isMouseDown && handleSlide(e)));
slideCtrls.forEach(ctrl => ctrl.addEventListener('mousedown', () => isMouseDown = true));
slideCtrls.forEach(ctrl => ctrl.addEventListener('mouseup', () => isMouseDown = false));

// fullscreen mode
fullscreenCtrl.addEventListener('click', handleFullscreen);
document.addEventListener('keyup', (e) => {
    // shortcut key for toggle i.e letter 'f'
    if (e.keyCode === 70) {
        handleFullscreen();
    }
    // exits fullscreen if 'esc' key is pressed
    if(e.keyCode === 27) {
        player.classList.remove('fullscreen');
        video.classList.remove('fullscreen');
    }
});