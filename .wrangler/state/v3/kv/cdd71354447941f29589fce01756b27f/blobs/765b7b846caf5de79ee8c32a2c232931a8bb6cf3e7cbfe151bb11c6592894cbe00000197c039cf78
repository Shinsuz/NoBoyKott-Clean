let Empfehlungen = [];
window.GespeicherteEmpfehlungen = [];
let EmpfehlungCounter = {}; // Zähler für jede Empfehlung

function click1() {
    const input = document.getElementById("inputField");
    const value = input.value.trim();
    if (!value) return;

    // Zähler erhöhen
    if (EmpfehlungCounter[value]) {
        EmpfehlungCounter[value]++;
    } else {
        EmpfehlungCounter[value] = 1;
    }

    Empfehlungen.push(value);
    window.GespeicherteEmpfehlungen.push(value);
    input.value = "";
    renderList();

    // Nachricht mit Zähler an Discord senden
    const count = EmpfehlungCounter[value];
    const msg = count > 1
        ? `Empfehlung: ${value} (${count}x)`
        : `Empfehlung: ${value}`;
    sendToDiscord(msg);

    alert("Empfehlung gespeichert!");
}

function renderList() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    Empfehlungen.forEach(e => {
        const li = document.createElement("li");
        li.textContent = e;
        list.appendChild(li);
    });
}

function sendToDiscord(msg) {
    const webhookUrl = "https://discord.com/api/webhooks/1388985836946722908/FLXwl1Y6UXvbbXY-qimzIVH_B7bIxb5Q5B3-AHFxM2-8talvk0BSHVb9sX3VUSFjJMrX"; // <-- hier deine Webhook-URL eintragen
    fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({content: msg})
    });
}   