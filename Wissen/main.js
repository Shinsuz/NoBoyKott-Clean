window.addEventListener('DOMContentLoaded', function() {
    const pdfUrl = 'wissen.pdf';
    fetch(pdfUrl)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            const typedarray = new Uint8Array(buffer);
            pdfjsLib.getDocument(typedarray).promise.then(async function(pdf) {
                let fullText = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const strings = content.items.map(item => item.str).join(' ');
                    fullText += strings + "\n\n";
                }
                window.wissenTexte = fullText.split(/\n{2,}/).map(t => t.trim()).filter(Boolean);
                renderText();
            });
        })
        .catch(err => {
            console.error("PDF konnte nicht geladen werden:", err);
        });

    // Suche-Event
    document.getElementById('EingabeFeld').addEventListener('input', function() {
        renderText(this.value.trim());
    });
});

let lastSearch = "";
let currentMatchIndex = 0;

document.getElementById('EingabeFeld').addEventListener('input', function() {
    // Bei neuer Suche von vorne beginnen
    if (this.value.trim() !== lastSearch) {
        currentMatchIndex = 0;
        lastSearch = this.value.trim();
    }
    renderText(this.value.trim());
});

// Enter-Taste: zum nächsten Treffer springen
document.getElementById('EingabeFeld').addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        currentMatchIndex++;
        renderText(this.value.trim());
    }
});

function renderText(suchbegriff = "") {
    const wissenDiv = document.getElementById("wissenContent");
    let matchIndices = [];
    let html = window.wissenTexte.map((t, idx) => {
        if (suchbegriff.length > 0) {
            const regex = new RegExp(`(${escapeRegExp(suchbegriff)})`, "gi");
            if (regex.test(t)) {
                matchIndices.push(idx);
            }
            t = t.replace(regex, '<mark class="highlight">$1</mark>');
        }
        return `<p id="absatz${idx}">${t}</p>`;
    }).join("");
    wissenDiv.innerHTML = html;

    // Scrollen zum aktuellen Treffer
    if (suchbegriff.length > 0 && matchIndices.length > 0) {
        // Index zurücksetzen, falls zu groß
        if (currentMatchIndex >= matchIndices.length) currentMatchIndex = 0;
        const ziel = document.getElementById(`absatz${matchIndices[currentMatchIndex]}`);
        if (ziel) ziel.scrollIntoView({behavior: "smooth", block: "center"});
    }
}

// Hilfsfunktion für Regex-Escape
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}