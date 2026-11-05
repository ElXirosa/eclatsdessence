import { updateCooldown } from "../countdown.js";

export function renderPromo(products){
    try{
        let newPrice = 0; 
        const container = document.getElementById("container-carousel");
        let DATE = {};
        let dateButoire = "";
        let cards = "";
        for(let i = 0; i < products.length; i++){
            DATE = updateCooldown(products[i].dateButoire);
            dateButoire = `${DATE.days}j ${DATE.hours}H ${DATE.minutes}m`;
            newPrice = products[i].prix * (products[i].pourcentage / 100);
            cards += 
            `
            <div class="carousel-card">
                            <div class="image-card">
                                <span class="tag-image promo">-${products[i].pourcentage} %</span>
                                <span class="tag-image info">${products[i].collection}</span>
                                <span class="tag-image countdown">${dateButoire}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#c4924a" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bottle-wine-icon lucide-bottle-wine"><path d="M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z"></path><path d="M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4"></path></svg>
                            </div>
                            <div class="box-card-info">
                            <h3>${products[i].nom}</h3>
                            <p>${products[i].notes.map(note => note).join("· ")}</p>
                            <span class="span-prix">${(newPrice).toFixed(2)} €</span>
                            <span class="span-old-price">${products[i].prix} €</span>
                            <span class="span-pourcent">-${products[i].pourcentage} %</span>
                            </div>
                            <a class="btn-cta-produit" href="#">Voir le produit</a>
                        </div>
            `;
        }
        container.innerHTML = cards;
    }catch(error){
        console.error("Une erreure est survenue lors du traitement du countdown", error);
    }
}