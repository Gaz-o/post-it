/* pour les RDV couleur vert */
let rdv = document.querySelector(".p-1");
/* pour les RDV couleur rouge */
let urg = document.querySelector(".p-2");
/* pour les RDV couleur jaune */
let todo = document.querySelector(".p-3");
/* pour les RDV couleur bleu */
let wlist = document.querySelector(".p-4");

/* mise en place des evenement des bouton de création de post-it */
evenement(rdv, "vert")
evenement(urg, "rouge")
evenement(todo, "jaune")
evenement(wlist, "bleu")

function add_data(data, contain) {
    /* pas mis la recup du data dedans pour pouvoir y rentré les info sauvegardé plus tard */
    let p = document.createElement("p");
    p.innerText = data.value;
    data.remove();
    contain.insertBefore(p, contain.children[1]);
}

function btn_valid(contain, btn) {
    btn.classList.add("btn_v");
    btn.innerText = "Validation";
    btn.addEventListener("click", function () {
        /* evenement validation recup du textarea */
        console.log("valid");
        let saisie = document.querySelector("textarea");
        /* fourrage de l'info dans la card */
        add_data(saisie, contain);
    });
}

function btn_suppr(contain, btn) {
    btn.classList.add("btn_s");
    btn.innerText = "Suppression";
    btn.addEventListener("click", function () {
        /* evenement suppression */
        console.log("suppr");
        contain.remove();
    });
}

function evenement(btn, couleur) {
    /* création d'un post it */
    btn.addEventListener("click", function () {
        /* création d'une div avec la class couleur et textarea */
        let card = document.createElement("card");
        let text = document.createElement("textarea");
        card.classList.add(couleur);
        /* création du BTN validation et l'evenement */
        let btn_v = document.createElement("p");
        btn_valid(card, btn_v);
        /* création du BTN suppretion et l'evenement */
        let btn_s = document.createElement("p");
        btn_suppr(card, btn_s)
        /* fourrage des div */
        card.appendChild(btn_v);
        card.appendChild(text);
        card.appendChild(btn_s);
        let affichage = document.querySelector(".tableau");
        affichage.appendChild(card);
    })
}