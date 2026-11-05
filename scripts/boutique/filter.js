import { STATEMENT } from "../boutique.js";
import { renderProducts } from "./render.js";
import { renderPagination } from "./pagination.js";

function getFilter() {
    try{

        const tableauOlfactive = Array.from(document.querySelectorAll(".check-f-olfa")).filter((familleOlfa) => familleOlfa.checked === true);
        const tableauGenre = Array.from(document.querySelectorAll(".check-f-genre")).filter((familleGenre) => familleGenre.checked === true);
        const tableauCollection = Array.from(document.querySelectorAll(".check-f-coll")).filter((familleColl) => familleColl.checked === true);
        const tableauNotes = Array.from(document.querySelectorAll(".tag-p-active"));
        const tableauVolume = Array.from(document.querySelectorAll(".tag-v-active"));
        const scoreState = document.querySelector(".star-row-active");
        const score = scoreState ? scoreState.dataset.id : null;
        const stockState = document.querySelector("#stock").checked;
        let STATE = 
        {
            familleOlfactives : tableauOlfactive.map((xOLfa) => xOLfa.dataset.id),
            genre : tableauGenre.map((xGenre) => xGenre.dataset.id),
            collection : tableauCollection.map((xColl) => xColl.dataset.id),
            notesOlfactives : tableauNotes.map((xNotes) => xNotes.innerText),
            volume : tableauVolume.map((xVol) => xVol.innerText),
            prixMax : parseInt(document.querySelector(".span-prix").innerText),
            noteMin : score,
            stock : stockState
        };
            return STATE;

    }catch (error){
        console.error("Une erreur lors de la récupération des filtres est survenue :", error);
    }
}

export function applyFilter() {
    try{
        let STATE = getFilter();
        const allProductsCopy = [...STATEMENT.allProducts];
        const produitsFiltres = allProductsCopy.filter((p) => 
        (STATE.familleOlfactives.length === 0 || STATE.familleOlfactives.includes(p.famille))
        &&
        (STATE.genre.length === 0 || STATE.genre.includes(p.genre))
        &&
        (STATE.collection.length === 0 || STATE.collection.includes(p.collection))
        &&
        (STATE.notesOlfactives.length === 0 || p.notes.some((n) => STATE.notesOlfactives.includes(n)))
        &&
        (STATE.volume.length === 0 || STATE.volume.includes(p.volume))
        &&
        (STATE.prixMax >= p.prix)
        &&
        (STATE.noteMin === null || STATE.noteMin <= p.note)
        &&
        (STATE.stock === false || p.stock > 0)
        );
        STATEMENT.currentPage = 1;
        renderProducts(produitsFiltres, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE);
        STATEMENT.arrayIsFiltered = true;
        STATEMENT.filteredArray = produitsFiltres;
        renderPagination(produitsFiltres);
    }catch (error){
        console.error("Une erreur est survenue lors du traitement et du filtrage des produit souhaités", error);
    }
}

const filtresTagsP = document.querySelectorAll(".tag-p");
filtresTagsP.forEach(tag => {
    tag.addEventListener("click", () => {
        if(tag.classList.value === "tag-p"){
        tag.classList.add("tag-p-active");
        }else{
            tag.classList.remove("tag-p-active");
        }
        applyFilter();
    });
});

const filtresTagsV = document.querySelectorAll(".tag-v");
filtresTagsV.forEach(tag => {
    tag.addEventListener("click", () => {
        if(tag.classList.value === "tag-v"){
        tag.classList.add("tag-v-active");
        }else{
            tag.classList.remove("tag-v-active");
        }
        applyFilter();
    });
});

const filtresNotes = document.querySelectorAll(".star-row");
filtresNotes.forEach(note => {
    note.addEventListener("click", () => {
        const estActif = note.classList.contains("star-row-active");
        filtresNotes.forEach(element => {
            element.classList.remove("star-row-active");
        });
        if(!estActif){
            note.classList.add("star-row-active");
        }
        applyFilter();
    });
});

document.querySelector("aside").addEventListener("change", (event) => {
    STATEMENT.currentPage = 1;
    applyFilter();
});

const inputRange = document.getElementById("range");
const spanPrixMini = document.querySelector('.prix-labels span');
inputRange.addEventListener("change", (event) => {
    spanPrixMini.innerText = `${inputRange.value} €`;
});