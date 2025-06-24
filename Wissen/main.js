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
                    const strings = content.items.map(item => item.str);
                    fullText += strings.join(" ") + "\n\n";
                }
                console.log(fullText); // <--- Hier siehst du, ob Text geladen wird!
                window.wissenTexte = fullText.split(/\n{2,}/).map(t => t.trim()).filter(Boolean);
                renderText();
            });
        })
        .catch(err => {
            console.error("PDF konnte nicht geladen werden:", err);
        });
});

function renderText() {
    const wissenDiv = document.getElementById("wissenContent");
    wissenDiv.innerHTML = window.wissenTexte.map(t => `<p>${t}</p>`).join("");
}
