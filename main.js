function clickedBox1() {
   window.location.href = `./QuranVideos/`;
}

function clickedBox2(){
    window.location.href = `./Nasheeds/`;
}

function clickedBox3(){
    window.location.href = `./Wissen/`;
}

function clickedBox4(){
    window.location.href = `./Empfehlungen/`;
}

function clickedBox5(){
    window.location.href = `./Dhikr/`;
}

// Speichern der Buttonfunktion (!nicht ganz verstanden!)

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`box${i}`);
    if (el) {
      el.addEventListener("click", () => {
        window.location.href = `/boxes/id${i}/`;
      });
    }
  }
});
