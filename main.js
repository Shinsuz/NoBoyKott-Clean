function clickedBox1() {
    window.location.href = "../MAIN/QuranVideos/index.html";

}

function clickedBox2(){
    window.location.href = "../MAIN/Nasheeds/index.html";
}

function clickedBox3(){
    window.location.href = "../MAIN/Wissen/index.html";
}

function clickedBox4(){
    window.location.href = "../MAIN/Empfehlungen/index.html";
}

// Speichern der Buttonfunktion (!nicht ganz verstanden!)

document.addEventListener("DOMContentLoaded"), () => {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`box${i}`).addEventListener("click", () => {
            window.location.href = `/boxes/id${i}/id${i}.html`;
        });
    }
}