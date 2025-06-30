function clickedBox1() {
   const base = window.location.pathname.split('/')[1]; 
   window.location.href = `QuranVideos/`;
}

function clickedBox2(){
    const base = window.location.pathname.split('/')[1];
    window.location.href = `/.../Nasheeds/index.html`;
}

function clickedBox3(){
    const base = window.location.pathname.split('/')[1];
    window.location.href = `/.../Wissen/index.html`;
}

function clickedBox4(){
    const base = window.location.pathname.split('/')[1];
    window.location.href = `/.../Empfehlungen/index.html`;
}
function clickedBox5(){
    const base = window.location.pathname.split('/')[1];
    window.location.href = `/.../Hadithe/index.html`;
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
