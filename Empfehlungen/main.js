let Empfehlungen = [];
window.GespeicherteEmpfehlungen = [];

function click1() {
    const input = document.getElementById("inputField");
    const value = input.value.trim();
    if (value) {
        Empfehlungen.push(value);
        window.GespeicherteEmpfehlungen.push(value);
        input.value = "";
        renderList();
        sendToDiscord("Neue Empfehlung: " + value);
        alert("Empfehlung gespeichert!");
    }
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
    const webhookUrl = "https://discord.com/api/webhooks/1387231845841633373/GaN1sxowNIE4fFyTNBxNQp8EmF8B_pdqA40Kv9WaxhDdCcIHgtkgCAymgJZNq_I0-ruq"; // <-- hier deine Webhook-URL eintragen
    fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({content: msg })
    });
}

// Im click1() nach renderList():
sendToDiscord(value);