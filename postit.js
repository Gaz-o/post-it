/* pour les RDV couleur vert */
let rdv = document.querySelector(".p-1");
/* pour les RDV couleur rouge */
let urg = document.querySelector(".p-2");
/* pour les RDV couleur jaune */
let todo = document.querySelector(".p-3");
/* pour les RDV couleur bleu */
let wlist = document.querySelector(".p-4");

/* création d'un post it */
rdv.addEventListener("click", function() {
    let affichage = document.querySelector(".tableau");
    /* création d'une div avec la class couleur et textarea */
    let card = document.createElement("card");
    let text = document.createElement("textarea");
    card.classList.add("vert");
    /* création du BTN validation et l'evenement */
    let btn_v = document.createElement("p");
    btn_v.classList.add("btn_v");
    btn_v.innerText = "Validation";
    btn_v.addEventListener("click", function() {
        console.log("valid");
    });
    /* création du BTN suppretion et l'evenement */
    let btn_s = document.createElement("p");
    btn_s.classList.add("btn_s");
    btn_s.innerText = "Suppression";
    btn_s.addEventListener("click", function() {
        console.log("suppr");
    });
    /* fourrage des div */
    card.appendChild(btn_v);
    card.appendChild(text);
    card.appendChild(btn_s);
    affichage.appendChild(card)
})