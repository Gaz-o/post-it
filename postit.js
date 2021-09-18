
let rdv = document.querySelector(".p-1");
let urg = document.querySelector(".p-2");
let todo = document.querySelector(".p-3");
let wlist = document.querySelector(".p-4");

let tableau = new Array
if (JSON.parse(localStorage.getItem("BDD")) != null) {
    tableau = JSON.parse(localStorage.getItem("BDD"))
};
let save_data = {
    class: "",
    data: "textarea",
    class_2: "",
    data_sup: "date"
}

for (let li in tableau) {
    if ( tableau[li] === null) { 
        tableau.splice(li, 1); 
    } else {
        let save = Object.create(save_data)
        save = tableau[li]
    
        let card = document.createElement("card");
        card.classList.add(save.class);
        let btn_v = document.createElement("p");
        btn_v.classList.add("btn_v");
        btn_v.innerText = "Validation";
        let p = document.createElement("p");
        p.classList.add("info")
        p.innerText = save.data
        let btn_s = document.createElement("p");
        btn_s.classList.add("btn_s");
        btn_s.innerText = "Suppression";
    
        let d
        if (tableau[li].data_sup != undefined) {
            d = document.createElement("p");
            d.classList.add("date")
            save.data_sup = tableau[li].data_sup
            d.innerText = save.data
        }
        let couleur = save.class
        let coul = save.class_2
        
        btn_v.addEventListener("click", function () {
            card.classList.toggle(coul);
            card.classList.toggle(couleur);
            save.class = card.classList.value;
            if (save.class == coul) {
                save.class_2 = couleur
            } else {
                save.class_2 = coul
            }
            tableau[li] = save
            console.log("changement de couleur", save)
            localStorage.clear()
            localStorage.setItem("BDD", JSON.stringify(tableau));
        });
        
        btn_s.addEventListener("click", function () {
            delete tableau[li]
            localStorage.clear()
            localStorage.setItem("BDD", JSON.stringify(tableau));
            console.log("suppr", li);
            card.remove();
        });
        card.appendChild(btn_v);
        card.appendChild(p);
        if (tableau[li].data_sup != undefined) {
            card.appendChild(d);
        }
        card.appendChild(btn_s);
        let affichage = document.querySelector(".tableau");
        affichage.appendChild(card);
    }
}

evenement(rdv, "vert", "date")
evenement(urg, "rouge")
evenement(todo, "jaune")
evenement(wlist, "bleu")

/* je refait la fonction mais en la ciblan plus */
function evenement(btn, couleur, scdbtn) {
    btn.addEventListener("click", function () {
        /* création des variables et atribution des info */
        let save = Object.create(save_data);
        let coul1 = couleur;
        save.class = coul1;
        let coul2 = couleur + "-ok";
        save.class_2 = coul2;
        let key = tableau.push();
        let sup;
        if (scdbtn == "date") {
            sup = document.createElement("input");
            sup.setAttribute("type", scdbtn);
        }
        let card = document.createElement("card");
        card.classList.add(couleur);
        card.setAttribute("id", "card_" + key)
        let text = document.createElement("textarea");
        text.setAttribute("id", "text_" + key)
        let btn_v = document.createElement("p");
        btn_v.classList.add("btn_v");
        btn_v.innerText = "Validation";
        let btn_s = document.createElement("p");
        btn_s.classList.add("btn_s");
        btn_s.innerText = "Suppression";
        let p = document.createElement("p");
        /* evenement du BTN validation */
        btn_v.addEventListener("click", function () {
            if (p.innerText == "") {
                let valeur = document.querySelector(`#text_${key}`)
                console.log("recup saisie de textarea", p.innerText);
                save.data = valeur.value;
                p.classList.add("info")
                p.innerText = valeur.value;
                text.remove()
                /* conditon en cas de vignette vert avec  */
                if (scdbtn == "date") {
                    let s = sup.value
                    let date_rdv = s.split('-').reverse().join('-');
                    save.data_sup = date_rdv
                    let d = document.createElement("p")
                    d.classList.add("date")
                    d.innerText = date_rdv
                    card.insertBefore(d, card.children[1]);
                    card.insertBefore(p, card.children[2]);
                    sup.remove();
                } else {
                    card.insertBefore(p, card.children[1]);
                }
            } else {
                if (scdbtn == "date") {
                    save.data_sup = card.children[1].innerText;
                    save.data = card.children[2].innerText;
                } else {
                    save.data = card.children[1].innerText;
                }
                console.log("changement de couleur");
                card.classList.toggle(coul1);
                card.classList.toggle(coul2);
                save.class = card.classList.value;
                console.log("Save modifier", key);
                if (save.class == coul1) {
                    save.class_2 = coul2
                } else {
                    save.class_2 = coul1
                }
            }
            tableau[key] = save
            console.log("Save Ok", key);
            localStorage.clear()
            localStorage.setItem("BDD", JSON.stringify(tableau));
        });
        card.appendChild(btn_v);
        if (scdbtn == "date") {
            card.appendChild(sup);
        }
        btn_s.addEventListener("click", function () {
            delete tableau[key]
            card.remove();
            console.log("suppr", key);
            localStorage.clear()
            localStorage.setItem("BDD", JSON.stringify(tableau));
        });
        card.appendChild(text);
        card.appendChild(btn_s);
        let affichage = document.querySelector(".tableau");
        affichage.appendChild(card);
    });
}