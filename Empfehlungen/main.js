let Empfehlungen = [];

function click1(){
    const input = document.getElementById("inputField");
    const btn = document.getElementById("saveBtn");
    const list = document.getElementById("list");
    const value = input.value.trim();
    if (value){
        Empfehlungen.push(value)
        input.value = "";
        renderList();
        }
    }
    function renderList(){
        list.innerHTML = "";
        Empfehlungen.forEach(e =>{
            const li = document.createElement("li")
            li.textContent = e;
            list.appendChild(li);
        })
    }


