fetch("main.json")
  .then(response => response.json())
  .then(hadithe => {
    const index = new Date().getDate() % hadithe.length;
    const dailyHadith = hadithe[index];

    const box = document.getElementById('dailyHadith');
    box.innerHTML = `
      <div class="hadith-box">
        <p>${dailyHadith.text.replace(/\n/g, "<br>")}</p>
        <div class="hadith-source">${dailyHadith.source}</div>
        ${dailyHadith.erklaerung ? `
          <button class="erklaerung-btn" onclick="toggleErklaerung()">Erklärung anzeigen</button>
          <div id="erklaerungBox" class="hadith-erklaerung" style="display:none;">
            <b>Erklärung:</b> ${dailyHadith.erklaerung}
          </div>
        ` : ""}
      </div>
    `;
  });

// Globale Funktion für das Button-Event
function toggleErklaerung() {
  const box = document.getElementById('erklaerungBox');
  const btn = document.querySelector('.erklaerung-btn');
  if (box.style.display === "none") {
    box.style.display = "block";
    btn.textContent = "Erklärung ausblenden";
  } else {
    box.style.display = "none";
    btn.textContent = "Erklärung anzeigen";
  }
}