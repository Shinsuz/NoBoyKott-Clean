function counter() {
  // Dhikr-Daten
  const dhikrs = [
    { id: 1, name: "100x Subhanallah", text: "سُبْحَانَ اللَّهِ", count: 0 , source: "Tirmidhi 3463, Sahih Muslim 2698" , reward: "Eintausend gute Taten oder eintausend Sünden werden getilgt" },
    { id: 2, name: "Alhamdulillah", text: "الْحَمْدُ لِلَّهِ", count: 0 },
    { id: 3, name: "Allahu Akbar", text: "اللَّهُ أَكْبَرُ", count: 0 },
    { id: 4, name: "Astaghfirullah", text: "أَسْتَغْفِرُ اللَّه", count: 0, source: "Sunan Abi Dawud 1518", reward: "Wer häufig Astaghfirullāh sagt, dem wird Allah einen Ausweg aus jeder Bedrängnis verschaffen   "},
    { id: 5, name: "La ilaha illallah", text: "لَا إِلَٰهَ إِلَّا اللَّهُ", count: 0, source: "Tirmidhi 3383", reward: "Der Beste Dhikr" },
    { id: 6, name: "100x Subhanallahi wa bihamdihi", text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 0, source: "Sahih al-Bukhari 640, Tirmidhi 3466, Riyad us Salihīn Book 16, Hadith 1451", reward: "Vergebung der Sünden auch wenn sie so viel sind wie der Meeresschaum" },
    { id: 7, name: "100x La ilaha illallah wahdahu la sharika lahu lahul mulku wa ala kulli shayin qadeer", text: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ ٱلْمُلْكُ وَلَهُ ٱلْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ", count: 0 , source: "Sahih al-Buhari 3293, Sahih Muslim 2691", reward: "Zehn Sklavenfreilassungen, 100 gute Taten, 100 Sünden getilgt, Schutz vor dem Shaytan den ganzen Tag"},
    { id: 8, name: "3x / 100x Ikhlas", text: "قُلْ هُوَ ٱللَّهُ أَحَدٌٱللَّهُ ٱلصَّمَدُلَمْ يَلِدْ وَلَمْ يُولَدْوَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ ", count: 0, source: "Sahih al-Bukhari 5013, Tirmidhi 2898", reward: "1x Ikhlas gleicht 1/3 des Qurans" },
    { id: 9, name: "Subhan'Allahi Al-Adhim wa bihamdih", text: "سُبْحَانَ ٱللَّٰهِ ٱلْعَظِيمِ وَبِحَمْدِهِ", count: 0, source: "Tirmidhi 3464", reward: "Für jedes Subhan'Allahi Al-Adhim wa bihamdih wird im Paradies eine Dattelpalme gepflanzt"},
    { id: 10, name: "Astaghfirullāha 'l-'Aẓīm alladhi lā ilāha illā huwa 'l-ḥayyul-Qayyūm wa atūbu ilayh", text: "سْتَغْفِرُ اللَّهَ الْعَظيمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ القَيّوُمُ وَأَتُوبُ إِلَيهِ", count: 0, source: "Abu Dawud 2/85, Tirmidhi 5/569, Hisn al-Muslim 250, Tirmidhi 3577", reward: "Allah wird ihm vergeben, selbst wenn er aus den Reihen der Armee desertiert ist" },
    { id: 11, name: "La hawla wala quwwata illah billah", text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰ", count: 0, source: "Sunan Ibn Majah 3825"},
    { id: 12, name: "SubhanAllahi, wa bi-hamdihi, Adada Khaliqihi, wa ridà Nafsihi, wa Zinata A’rshihi, wa Midada Kalimatihi", text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ", count: 0, source: "Sahih Muslim 2726,  Jami` at-Tirmidhi 3555"},
    { id: 13, name: "Ash-hadu an la ilaha illallahu Wahdahu la sharika Lahu, wa ash-hadu anna Muhammadan 'abduhu wa Rasuluhu + Allahummajalni minat tawwabin, waj'alni minal mutatahhirin", text: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ + ٱللَّٰهُمَّ ٱجْعَلْنِي مِنَ ٱلتَّوَّابِينَ وَٱجْعَلْنِي مِنَ ٱلْمُتَطَهِّرِينَ", count: 0, source: "Riyad us Salihin Buch 9, Hadith 1032, Tirmidhi 55, Sunan Ibn Majah Buch 1, Hadith 508", reward: "Eintreten ins Paradies durch eines der acht Tore, durch welches man möchte"},
    { id: 14, name: "40x La ilahe illa ente subhaneke inni kuntu minezzalimin", text: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ", count: 0, source: "Tirmidhi 3505"},
    { id: 15, name: "7x Allahumma ajirni minan naar", text: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ", count: 0, source: "Sunan Abi Dawud 79"},
    { id: 16, name: "7x Allahumma inni as'aluka al jannah", text: "اللهم اِنّي أَسْئَلُكَ الجَنّةُ ", count: 0, source: "Sunan Abi Dawud 79"},
    { id: 17, name: "Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammad", text: "اللهم صل على محمد وعلى آل محمد", count: 0, source: "Sunan an-Nasa'i 1297", reward: "1x Salawat = 10x für dich, 10 Sünden werden getilgt und Erhöhung des Status um 10 Stufen"},
    { id: 18, name: "100x Rabbighfir lī wa tubb ʿalayya, innaka anta t-Tawwābu r-Raḥīm", text: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ، إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ", count: 0, source: "Sunan Abi Dawud 1516"},
    { id: 19, name: "7x Hasbiyallāhu lā ilāha illā huwa, ʿalayhi tawakkaltu wa huwa rabbu l-ʿarshi l-ʿaẓīm", text: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 0, source: "Sunan Abi Dawud 5081", reward: "Wer diesen Dhikr 7x mal Morgens & Abends sagt, dem genügt Allah gegen seine Kummer und Sorgen"},
    { id: 20, name: "3x Bismillāhi lladhī lā yaḍurru maʿa ismihi shayʾun fi l-arḍi wa lā fi s-samāʾi wa huwa s-samīʿu l-ʿalīm", text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 0, source: "Abi Dawud 5088, Tirmidhi 3388", reward: "Wer diesen Dhikr 3x Morgens sagt wird bis zum Abend keine plötzlichen Bedrägnisse erleiden, wer es am Abend 3x mal sagt wird bis zum Morgen keine plötzlichen Bedrägnisse erleiden"}, 
    { id: 21, name: "Aʿūdhu bi-kalimāti llāhi t-tāmmāti min sharri mā khalaq", text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", count: 0, source: "Sahih Muslim 2708, Sunan Ibn Majah 3547" , reward: "Wer diesen Dhikr an einem Ort sagt an dem man gelangt ist (beispielsweise wegen einer Reise), dem wird Schutz vor dem Bösen gewährt und ihm kann nichts schaden bis er weitermarschiert"},
    { id: 22, name: "Lā ilāha illallāhu l-ʿAẓīmu l-Ḥalīmu, lā ilāha illallāhu rabbu l-ʿarshi l-ʿaẓīm", text: "لَا إِلَٰهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 0, source: "Sahih al-Bukhari 6345, Sahih Muslim 2730a", reward: "In Not & in Schwierigkeiten"},
    { id: 23, name: "Yā Ḥayyu yā Qayyūm, bi-raḥmatika astaghīth", text: "يَا حَيُّ يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ", count: 0, source: "Sunan at-Tirmidhi 3524", reward: "In Not & in Schwierigkeiten"},
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