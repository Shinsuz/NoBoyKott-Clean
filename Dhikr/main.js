function counter() {
  // Dhikr-Daten
  const dhikrs = [
    { id: 1, name: "100x Subhanallah", text: "سُبْحَانَ اللَّهِ", count: 0 , source: "Tirmidhi 3463, Sahih Muslim 2698" , reward: "Eintausend gute Taten oder eintausend Sünden werden getilgt" },
    { id: 2, name: "Alhamdulillah", text: "الْحَمْدُ لِلَّهِ", count: 0 },
    { id: 3, name: "Allahu Akbar", text: "اللَّهُ أَكْبَرُ", count: 0 },
    { id: 4, name: "Astaghfirullah", text: "أَسْتَغْفِرُ اللَّه", count: 0, source: "Sunan Abi Dawud 1518", reward: "Wer häufig Astaghfirullāh sagt, dem wird Allah einen Ausweg aus jeder Bedrängnis verschaffen   "},
    { id: 5, name: "La ilaha illallah", text: "لَا إِلَٰهَ إِلَّا اللَّهُ", count: 0, source: "Tirmidhi 3383", reward: "Der Beste Dhikr" },
    { id: 6, name: "100x Subhanallahi wa bihamdihi", text: "سُبْحَانَ اللَّهِ", count: 0, source: "Sahih al-Bukhari 640, Tirmidhi 3466, Riyad us Salihīn Book 16, Hadith 1451", reward: "Vergebung der Sünden auch wenn sie so viel sind wie der Meeresschaum" },
    { id: 7, name: "100x La ilaha illallah wahdahu la sharika lahu lahul mulku wa ala kulli shayin qadeer", text: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ ٱلْمُلْكُ وَلَهُ ٱلْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ", count: 0 , source: "Sahih al-Buhari 3293", reward: "Zehn Sklavenfreilassungen, 100 gute Taten, 100 Sünden getilgt, ein Schutz vor dem Shaytan den ganzen Tag"},
    { id: 8, name: "3x / 100x Ikhlas", text: "إِخْلَاص", count: 0, source: "Sahih al-Bukhari 5013, Jami` at-Tirmidhi 2898", reward: "1x Ikhlas gleicht 1/3 des Qurans" },
    { id: 9, name: "Subhan'Allahi Al-Adhim wa bihamdih", text: "سُبْحَانَ ٱللَّٰهِ ٱلْعَظِيمِ وَبِحَمْدِهِ", count: 0, source: "Tirmidhi 3464", reward: "Für jedes Subhan'Allahi Al-Adhim wa bihamdih wird im Paradies eine Dattelpalme gepflanzt"},
    { id: 10, name: "Astaghfirullāha 'l-'Aẓīm alladhi lā ilāha illā huwa 'l-ḥayyul-Qayyūm wa atūbu ilayh", text: "سْتَغْفِرُ اللَّهَ الْعَظيمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ القَيّوُمُ وَأَتُوبُ إِلَيهِ", count: 0, source: "Abu Dawud 2/85, Tirmidhi 5/569,Hisn al-Muslim 250", reward: "Allah wird ihm vergeben, selbst wenn er aus den Reihen der Armee desertiert ist" },
    { id: 11, name: "La hawla wala quwwata illah billah", text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰ", count: 0, source: "Sunan Ibn Majah 3825"},
    { id: 12, name: "SubhanAllahi, wa bi-hamdihi, Adada Khaliqihi, wa ridà Nafsihi, wa Zinata A’rshihi, wa Midada Kalimatihi", text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ", count: 0, source: "Sahih Muslim 2726,  Jami` at-Tirmidhi 3555"},
    { id: 13, name: "Ash-hadu an la ilaha illallahu Wahdahu la sharika Lahu, wa ash-hadu anna Muhammadan 'abduhu wa Rasuluhu + Allahummajalni minat tawwabin, waj'alni minal mutatahhirin", text: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ + ٱللَّٰهُمَّ ٱجْعَلْنِي مِنَ ٱلتَّوَّابِينَ وَٱجْعَلْنِي مِنَ ٱلْمُتَطَهِّرِينَ", count: 0, source: "Riyad us Salihin Buch 9, Hadith 1032, Tirmidhi 55, Sunan Ibn Majah Buch 1, Hadith 508", reward: "Eintreten ins Paradies durch eines der acht Tore, durch welches man möchte"},
    { id: 14, name: "40x La ilahe illa ente subhaneke inni kuntu minezzalimin", text: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ", count: 0 },
    { id: 15, name: "7x Allahumma ajirni minan naar", text: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ", count: 0, source: "Sunan Abi Dawud 79"},
    { id: 16, name: "7x Allahumma inni as'aluka al jannah", text: "اللهم اِنّي أَسْئَلُكَ الجَنّةُ ", count: 0, source: "Sunan Abi Dawud 79"},
    {},
    {},
    {},
    {},
    {},
  ];

   // LocalStorage Funktionen
  function saveCounters() {
    localStorage.setItem('dhikrCounters', JSON.stringify(dhikrs));
  }

  function loadCounters() {
    const saved = localStorage.getItem('dhikrCounters');
    if (saved) {
      const parsed = JSON.parse(saved);
      dhikrs.forEach(dhikr => {
        const savedDhikr = parsed.find(d => d.id === dhikr.id);
        if (savedDhikr) dhikr.count = savedDhikr.count;
      });
    }
  }

  // Dhikr-Boxen erstellen
  function createDhikrBoxes() {
    const container = document.getElementById('dhikr-container');
    container.innerHTML = '';

    dhikrs.forEach(dhikr => {
      const box = document.createElement('div');
      box.className = 'dhikr-box';
      
      const sourceInfo = (dhikr.source || dhikr.reward) ? `
        <div class="source-info">
          ${dhikr.source ? `<p class="source"><strong>Quelle:</strong> ${dhikr.source}</p>` : ''}
          ${dhikr.reward ? `<p class="reward"><strong>Belohnung:</strong> ${dhikr.reward}</p>` : ''}
        </div>
      ` : '';
      
      box.innerHTML = `
        <h3 class="dhikr-name">${dhikr.name}</h3>
        <p class="dhikr-text">${dhikr.text}</p>
        <div class="counter-container">
          <button class="btn decrement" data-id="${dhikr.id}">-</button>
          <span class="counter" data-id="${dhikr.id}">${dhikr.count}</span>
          <button class="btn increment" data-id="${dhikr.id}">+</button>
        </div>
        ${sourceInfo}
        <button class="reset-btn" data-id="${dhikr.id}">Reset</button>
      `;
      container.appendChild(box);
    });
  }

  // Zähler aktualisieren
  function updateCounter(id, value) {
    const counterElement = document.querySelector(`.counter[data-id="${id}"]`);
    if (counterElement) {
      counterElement.textContent = value;
      counterElement.classList.add('counter-animate');
      setTimeout(() => {
        counterElement.classList.remove('counter-animate');
      }, 300);
    }
  }

  // Event-Handler
  function setupEventListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      const id = parseInt(target.dataset.id);
      const dhikr = dhikrs.find(d => d.id === id);
      
      if (!dhikr) return;

      if (target.classList.contains('increment')) {
        dhikr.count++;
        updateCounter(id, dhikr.count);
      } 
      else if (target.classList.contains('decrement')) {
        if (dhikr.count > 0) dhikr.count--;
        updateCounter(id, dhikr.count);
      }
      else if (target.classList.contains('reset-btn')) {
        dhikr.count = 0;
        updateCounter(id, dhikr.count);
      }

      saveCounters();
    });
  }

  // Initialisierung
  function init() {
    loadCounters();
    createDhikrBoxes();
    setupEventListeners();
  }

  init();
}

document.addEventListener('DOMContentLoaded', counter);