window.addEventListener('DOMContentLoaded', function() {
    // PDF-URLs und Initialisierung
    const pdfUrls = ['wissen.pdf', ];
    window.wissenTexte = {};
    let loadedPdfCount = 0;

    // Textbereinigungsfunktion
    const cleanExtractedText = (text, pdfName) => {
        // 1. Entferne PDF-bezogene Muster
        let cleaned = text.replace(new RegExp(pdfName.replace('.pdf', ''), 'gi'), '')
                         .replace(/\.pdf/gi, '')
                         .replace(/wissen/gi, '')
                         .replace(/\bSeite\s*\d+/gi, '')
                         .replace(/\b\d+\s*von\s*\d+/gi, '');

        // 2. Korrigiere Textformatierung
        cleaned = cleaned.replace(/(\w+)-(\w+)/g, '$1$2')
                        .replace(/(\S)\s*\n\s*(\S)/g, '$1 $2')
                        .replace(/\b\w\b/g, '')
                        .replace(/\s+/g, ' ');

        // 3. Absatzbereinigung
        return cleaned.split('\n')
                      .map(line => line.trim())
                      .filter(line => line.length > 3)
                      .join('\n');
    };

    // PDF-Ladefunktion
    const loadPdf = async (pdfUrl) => {
        try {
            const response = await fetch(pdfUrl);
            if (!response.ok) throw new Error(`Fehler ${response.status}`);
            
            const buffer = await response.arrayBuffer();
            const typedarray = new Uint8Array(buffer);  
            const pdf = await pdfjsLib.getDocument(typedarray).promise;
            
            let fullText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                
                const strings = content.items
                    .map(item => item.str)
                    .filter(str => {
                        const lowerStr = str.toLowerCase();
                        return !lowerStr.includes('.pdf') && 
                               !lowerStr.includes('wissen') &&
                               str.trim().length > 3;
                    })
                    .join(' ')
                    .replace(/\s+/g, ' ');
                
                fullText += strings + '\n';
            }

            return {
                name: pdfUrl.replace('.pdf', ''),
                text: cleanExtractedText(fullText, pdfUrl)
                         .split(/\n+/)
                         .map(p => p.trim())
                         .filter(p => p.length > 0)
            };
        } catch (error) {
            console.error(`Fehler bei ${pdfUrl}:`, error);
            return { name: pdfUrl.replace('.pdf', ''), text: [] };
        }
    };

    // Hauptinitialisierung
    const init = async () => {
        const loadingPromises = pdfUrls.map(async pdfUrl => {
            const data = await loadPdf(pdfUrl);
            window.wissenTexte[pdfUrl] = data;
            loadedPdfCount++;
        });

        await Promise.all(loadingPromises);
        renderText();
        setupSearch();
    };

    // Rendering und Suche
    const renderText = (searchTerm = "") => {
        const contentDiv = document.getElementById("wissenContent");
        let html = '';
        
        Object.entries(window.wissenTexte).forEach(([url, data]) => {
            html += `<div class="pdf-section">
                        <h2>${data.name}</h2>
                        <div class="pdf-content">`;
            
            data.text.forEach((paragraph, idx) => {
                let displayText = paragraph;
                if (searchTerm) {
                    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
                    displayText = paragraph.replace(regex, '<mark>$1</mark>');
                }
                html += `<p id="${data.name}-${idx}">${displayText}</p>`;
            });
            
            html += `</div></div>`;
        });
        
        contentDiv.innerHTML = html;
    };

    const setupSearch = () => {
        const searchInput = document.getElementById('EingabeFeld');
        searchInput.addEventListener('input', () => renderText(searchInput.value.trim()));
    };

    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Start
    init();
});

// In der cleanExtractedText-Funktion:
cleaned = cleaned
  // Entferne Seitenzahlen und Paginierung
  .replace(/\bSeite\s*\d+/gi, '')
  .replace(/\b\d+\s*von\s*\d+/gi, '')
  
  // Korrigiere Trennungen am Zeilenende
  .replace(/([a-zäöüß])-\s*([a-zäöüß])/gi, '$1$2')
  
  // Entferne isolierte Buchstaben
  .replace(/\b\w\b/g, '')
  
  // Normalisiere Leerzeichen
  .replace(/\s+/g, ' ')
  .trim();