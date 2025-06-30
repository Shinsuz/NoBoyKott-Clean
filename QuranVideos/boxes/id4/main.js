let currentVideoSrc = null;
let currentVideoElement = null;

document.querySelectorAll("video").forEach(video => {
    video.addEventListener("play", function() {
        currentVideoSrc = video.getAttribute("src");
        currentVideoElement = video;
    });
});

function openCurrentExtern() {
    if (currentVideoSrc){
        const width = 400;
        const height = 225;
        const left = window.screenX + window.innerWidth - width - 10;
        const top = window.screenY + window.innerHeight - height - 10;
        window.open(currentVideoSrc, "_blank", `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`);
        if (currentVideoElement){
            currentVideoElement.pause();
            currentVideoElement.currentTime = currentTime;
        }
    } else{
        alert("Starte zuerst ein Video.")
    }
}

let currentVideo = null;
const loopBtn = document.getElementById('loopBtn');
const videos = document.querySelectorAll('.container video');

videos.forEach(video => {
  video.addEventListener('play', function() {
    currentVideo = this;
    loopBtn.textContent = currentVideo.loop ? "🔁 Loop: An" : "🔁 Loop: Aus";
    // Optional: andere Videos pausieren
    videos.forEach(v => { if (v !== this) v.pause(); });
  });
});

loopBtn.addEventListener('click', function() {
  if (currentVideo) {
    currentVideo.loop = !currentVideo.loop;
    loopBtn.textContent = currentVideo.loop ? "🔁 Loop: An" : "🔁 Loop: Aus";
  } else {
    alert("Bitte starte zuerst ein Video, um Loop zu aktivieren.");
  }
});