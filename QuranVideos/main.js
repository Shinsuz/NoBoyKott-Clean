function clickedBox1() {
    window.location.href = "../QuranVideos/boxes/id1/id1.html";

}

function clickedBox2(){
    window.location.href = "../QuranVideos/boxes/id2/id2.html";
}

function clickedBox3(){
    window.location.href = "../QuranVideos/boxes/id3/id3.html";
}

function clickedBox4(){
    window.location.href = "../QuranVideos/boxes/id4/id4.html";
}

function clickedBox5(){
    window.location.href = "../QuranVideos/boxes/id5/id5.html";
}


// Speichern der Buttonfunktion (!nicht ganz verstanden!)

document.addEventListener("DOMContentLoaded"), () => {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`box${i}`).addEventListener("click", () => {
            window.location.href = `/boxes/id${i}/id${i}.html`;
        });
    }
}