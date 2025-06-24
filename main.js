function clickedBox1() {
   const base = window.location.pathname.split('/')[1]; 
   window.location.href = `/${base}/MAIN/QuranVideos/index.html`;
}

function clickedBox2(){
    const base = window.location.pathname.split('/')[1];
    window.location.href = `/${base}/MAIN/QuranVideos/index.html`;
}

function clickedBox3(){
    const base = window.location.pathname.split('/')[1];
    window.location.href = `/${base}/MAIN/QuranVideos/index.html`;
}

function clickedBox4(){
     const base = window.location.pathname.split('/')[1];
    window.location.href = `/${base}/MAIN/QuranVideos/index.html`;
}

// Speichern der Buttonfunktion (!nicht ganz verstanden!)

document.addEventListener("DOMContentLoaded"), () => {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`box${i}`).addEventListener("click", () => {
            window.location.href = `/boxes/id${i}/id${i}.html`;
        });
    }
}