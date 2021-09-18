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
let tabl = tableau;
/* création de l'obj literal */
let save_data = {
    class: "",
    data: "",
    class_2: ""
}

/* réaffichage du tableau une fois ouverture de la page */
for (let li in tableau) {
    console.log(li);
    let save = Object.create(save_data)
    save.class = tableau[li].class
    save.data = tableau[li].data
    save.class_2 = tableau[li].class_2
    let couleur = save.class
    let coul = save.class_2
    /* création de la card */
    let card = document.createElement("card");
    card.classList.add(save.class);
    /* créer les btn */
    let btn_v = document.createElement("p");
    btn_v.classList.add("btn_v");
    btn_v.innerText = "Validation";
    btn_v.addEventListener("click", function () {
        console.log("changement de couleur", save)
        card.classList.toggle(coul);
        card.classList.toggle(couleur);
        save.class = card.classList.value;
        save.data = card.children[1].innerText
        if (save.class == coul) {
            save.class_2 = couleur
        } else {
            save.class_2 = coul
        }
        console.log(couleur, coul, "Save modifier");
        tableau[li] = save
        localStorage.clear()
        localStorage.setItem("BDD", JSON.stringify(tableau));
    });
    let p = document.createElement("p");
    p.classList.add("info")
    p.innerText = save.data
    let btn_s = document.createElement("p");
    btn_s.classList.add("btn_s");
    btn_s.innerText = "Suppression";
    btn_s.addEventListener("click", function () {
        /* evenement suppression */
        tableau.splice(li, 1)
        localStorage.clear()
        localStorage.setItem("BDD", JSON.stringify(tableau));
        console.log("suppr", li);
        card.remove();
        window.location.reload()
    });
    card.appendChild(btn_v);
    card.appendChild(p);
    card.appendChild(btn_s);
    let affichage = document.querySelector(".tableau");
    affichage.appendChild(card);
}

/* mise en place des evenement des bouton de création de post-it */
evenement(rdv, "vert")
evenement(urg, "rouge")
evenement(todo, "jaune")
evenement(wlist, "bleu")

function evenement(btn, couleur) {
    /* création d'un post it */
    btn.addEventListener("click", function () {
        /* création d'une div avec la class couleur et textarea */
        let card = document.createElement("card");
        let text = document.createElement("textarea");
        card.classList.add(couleur);
        /* création du BTN validation et l'evenement */
        let btn_v = document.createElement("p");
        let entr
        btn_v.classList.add("btn_v");
        btn_v.innerText = "Validation";
        btn_v.addEventListener("click", function () {
            /* evenement validation recup du textarea */
            let save = Object.create(save_data);
            let coul1 = couleur;
            let coul2 = couleur + "-ok";
            save.class = coul1
            save.class_2 = coul2
            console.log(save.class, "=", coul1, save.class_2, "=", coul2, "créa");
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
                card.insertBefore(p, card.children[1]);
                entr = tableau.push(save)
                entr -= 1
                document.querySelector("textarea").remove();
                console.log("Save Ok", entr);
                localStorage.clear()
                localStorage.setItem("BDD", JSON.stringify(tableau));
            } else {
                console.log("changement de couleur")
                card.classList.toggle(coul1);
                card.classList.toggle(coul2);
                save.class = card.classList.value;
                save.data = card.children[1].innerText;
                console.log("Save modifier", entr);
                if (save.class == coul1) {
                    save.class_2 = coul2
                } else {
                    save.class_2 = coul1
                }
                tableau[entr] = save
                localStorage.clear()
                localStorage.setItem("BDD", JSON.stringify(tableau));
                console.log(save.class, "=", coul1, save.class_2, "=", coul2, "créa");
            }
            /* mise en objet literal et sauvegarde dans le localstorage */
        });
        /* création du BTN suppretion et l'evenement */
        let btn_s = document.createElement("p");
        btn_s.classList.add("btn_s");
        btn_s.innerText = "Suppression";
        btn_s.addEventListener("click", function () {
            /* evenement suppression */
            tableau.splice(entr, 1)
            localStorage.clear()
            localStorage.setItem("BDD", JSON.stringify(tableau));
            console.log("suppr", entr);
            card.remove();
            window.location.reload()
        });
        /* fourrage des div */
        card.appendChild(btn_v);
        card.appendChild(text);
        card.appendChild(btn_s);
        let affichage = document.querySelector(".tableau");
        affichage.appendChild(card);
    })
}