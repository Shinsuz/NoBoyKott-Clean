let currentAudio = null;
const loopBtn = document.getElementById('loopBtn');
const audios = document.querySelectorAll('.audio-track');

// Wenn ein Audio abgespielt wird, merken wir uns dieses
audios.forEach(audio => {
  audio.addEventListener('play', function() {
    // Loop-Button-Status aktualisieren
    currentAudio = this;
    loopBtn.textContent = currentAudio.loop ? "🔁 Loop: An" : "🔁 Loop: Aus";
    // Alle anderen Audios stoppen
    audios.forEach(a => { if (a !== this) a.pause(); });
  });
});

// Loop-Button toggelt nur das aktuell abgespielte Audio
loopBtn.addEventListener('click', function() {
  if (currentAudio) {
    currentAudio.loop = !currentAudio.loop;
    loopBtn.textContent = currentAudio.loop ? "🔁 Loop: An" : "🔁 Loop: Aus";
  } else {
    alert("Bitte spiele zuerst ein Audio ab, um die Loop-Funktion zu nutzen.");
  }
});

