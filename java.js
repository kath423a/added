let filter = "alle";
let titler;
const link = "https://spreadsheets.google.com/feeds/list/1Qhbtjd_VhlT8nuxoCCdbNCtfS7jHS7BAOy__kgOHWJM/od6/public/values?alt=json";

document.addEventListener("DOMContentLoaded", hentData);








async function hentData() {
    const respons = await fetch(link);
    titler = await respons.json();
    listenersToButtons();
    vis();
}






function vis() {
    const container = document.querySelector("#container");
    const temp = document.querySelector("template");
    container.innerHTML = "";
    titler.feed.entry.forEach(titel => {
        if (filter == "alle" || filter == titel.gsx$genre.$t) {
            let klon = temp.cloneNode(true).content;
            klon.querySelector(".titel").textContent = titel.gsx$titel.$t;
            klon.querySelector(".billede").src = `imgs/${titel.gsx$billede.$t}.jpg`;
            klon.querySelector("article").addEventListener("click", () => visDetaljer(titel));

            container.appendChild(klon);
        }
    })
}


function visDetaljer(titel) {
    location.href = `detalje.html?id=${titel.gsx$id.$t}`
}








function listenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })

}

function filterBTNs() {
    filter = this.dataset.type;
    //    document.querySelector("#kategoriOverskrift").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    hentData();
}
