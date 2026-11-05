import { updateCooldown } from "./countdown.js";
import { renderPromo } from "./promo/renderPromo.js";

const API_URL = "./data/db.json";
const STATEMENT = {
    allProducts: [],
    allPromo: [],
    allLimited: []
}
fetchProducts();
setInterval(renderCountBar, 60000);

async function fetchProducts(){
    try{
        const response = await fetch(API_URL);
        const json = await response.json();
        const data = json.products
        STATEMENT.allProducts = data;
        STATEMENT.allPromo = data.filter(product => product.collection.includes("Promotion"));
        STATEMENT.allProducts = data.filter(product => product.collection.includes("Édition limitée"));
        renderPromo(STATEMENT.allPromo);
        renderCountBar()
    }catch(error){
        console.error("Une erreur est survenue lors de la récupération des données API", error);
    }
}

function renderCountBar(){
    const PROMODATE = updateCooldown(STATEMENT.allPromo[1].dateButoire);
    if(typeof PROMODATE != "object" || PROMODATE === null){
        console.log(PROMODATE);
        throw new Error("La valeur PROMODATE n'est pas exploitable !");
    }
    try{
            const countBar = document.querySelector("#box-banner-bar");
        if(typeof PROMODATE === "object" && PROMODATE != null){
                countBar.innerHTML = `<strong>Offre limitée — se termine dans :</strong><span class="cooldown-number">${PROMODATE.days}j</span> <span class="cooldown-number">${PROMODATE.hours}h</span><span class="cooldown-number">${PROMODATE.minutes}m</span>`;
        }
    }catch(error){
        console.error("Une erreur est survenue lors de l'affichage du countdown bandeau", error);
    }
}

