fetch("main.json")
  .then(response => response.json())
  .then(hadithe => {
    const box = document.getElementById('dailyHadith');
    box.innerHTML = hadithe.map((hadith, i) => `
      <div class="hadith-box">
        <p>${hadith.text.replace(/\n/g, "<br>")}</p>
        <div class="hadith-source">${hadith.source}</div>
        ${hadith.erklaerung ? `
          <button class="erklaerung-btn" onclick="toggleErklaerung(${i})">Erklärung anzeigen</button>
          <div id="erklaerungBox${i}" class="hadith-erklaerung" style="display:none;">
            <b>Erklärung:</b> ${hadith.erklaerung}
          </div>
        ` : ""}
      </div>
    `).join('');
  });

function toggleErklaerung(i) {
  const box = document.getElementById('erklaerungBox' + i);
  const btn = document.querySelectorAll('.erklaerung-btn')[i];
  if (box.style.display === "none") {
    box.style.display = "block";
    btn.textContent = "Erklärung ausblenden";
  } else {
    box.style.display = "none";
    btn.textContent = "Erklärung anzeigen";
  }
}