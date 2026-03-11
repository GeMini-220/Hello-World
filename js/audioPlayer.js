// musicPlayer.js

// Create audio element
const audio = document.createElement('audio');
audio.id = 'bgMusic';
audio.loop = true;
audio.src = '/Hello-World/res/audio/softsuicide-a-time-of-fall.mp3';  // change to your file
document.body.appendChild(audio);

// Create controls button
const button = document.createElement('div');
button.id = 'musicControls';
button.style.position = 'fixed';
button.style.top = '10px';
button.style.right = '10px';
button.style.background = 'rgba(0,0,0,0.6)';
button.style.color = 'white';
button.style.padding = '8px 12px';
button.style.borderRadius = '6px';
button.style.cursor = 'pointer';
button.style.fontFamily = 'sans-serif';
document.body.appendChild(button);

// --- PERSISTENT STATE ---
let isPlaying = localStorage.getItem('musicPlaying') === 'true';

// Restore playback time
const savedTime = localStorage.getItem('musicTime');
if (savedTime) audio.currentTime = parseFloat(savedTime);

// Update button text
function updateButton() {
  button.textContent = isPlaying ? 'Pause Music' : 'Play Music';
}

// Play/pause functionality
button.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play().catch(err => console.log('User interaction required to start music'));
    isPlaying = true;
  }
  localStorage.setItem('musicPlaying', isPlaying);
  updateButton();
});

// Resume playback if it was playing
if (isPlaying) {
  audio.play().catch(err => console.log('Autoplay blocked, user must press play'));
  isPlaying = false;
}

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('restoring audio playback on browser \'back\'');
    // Restore audio state
    const audio = document.getElementById('bgMusic');
    const savedTime = localStorage.getItem('musicTime');
    if(savedTime) audio.currentTime = parseFloat(savedTime);

    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    if(isPlaying) audio.play().catch(err => console.log('Autoplay blocked'));
  }
});

updateButton();

// --- SAVE PLAYBACK POSITION ---
audio.addEventListener('timeupdate', () => {
  localStorage.setItem('musicTime', audio.currentTime);
});