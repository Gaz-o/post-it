/* pour les RDV couleur vert */
let rdv = document.querySelector(".p-1");
/* pour les RDV couleur rouge */
let urg = document.querySelector(".p-2");
/* pour les RDV couleur jaune */
let todo = document.querySelector(".p-3");
/* pour les RDV couleur bleu */
let wlist = document.querySelector(".p-4");

/* mise en place du tableau de local storage */
let tableau = new Array
if (JSON.parse(localStorage.getItem("BDD")) != null) {
    tableau = JSON.parse(localStorage.getItem("BDD"))
};

let save_data = {
    class: "",
    data: "",
}

/* mise en place des evenement des bouton de création de post-it */
evenement(rdv, "vert")
evenement(urg, "rouge")
evenement(todo, "jaune")
evenement(wlist, "bleu")

function btn_valid(contain, btn, couleur, entr) {
    btn.classList.add("btn_v");
    btn.innerText = "Validation";
    btn.addEventListener("click", function () {
        /* evenement validation recup du textarea */
        let save = Object.create(save_data);
        save.class = couleur;
        let saisie
        if (document.querySelector("textarea") != null) {
            saisie = document.querySelector("textarea").value;
            console.log("recup saisie de textarea");
            /* fourrage de l'info dans la card */
            let p = document.createElement("p");
            /* pas mis la recup du data dedans pour pouvoir y rentré les info sauvegardé plus tard */
            p.classList.add("info")
            p.innerText = saisie;
            save.data = saisie; 
            contain.insertBefore(p, contain.children[1]);
            entr = tableau.push(save)
            document.querySelector("textarea").remove();
            console.log("Save Ok", entr-=1);
            localStorage.clear()
            localStorage.setItem("BDD", JSON.stringify(tableau));
        } else {
            console.log("changement de couleur")
            couleur = "ok";
            contain.classList.toggle(couleur);
            save.class = contain.classList.value;
            save.data = contain.children[1].innerText
            console.log("Save modifier", entr);
            tableau[entr] = save
            localStorage.clear()
            localStorage.setItem("BDD", JSON.stringify(tableau));
        }
        /* mise en objet literal et sauvegarde dans le localstorage */
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

function evenement(btn, couleur, data) {
    /* création d'un post it */
    btn.addEventListener("click", function () {
        /* création d'une div avec la class couleur et textarea */
        let card = document.createElement("card");
        let text = document.createElement("textarea");
        card.classList.add(couleur);
        /* création du BTN validation et l'evenement */
        let btn_v = document.createElement("p");
        let entr
        btn_valid(card, btn_v, couleur, entr);
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