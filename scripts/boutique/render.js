export function renderProducts(products, currentPage, PRODUCTS_PER_PAGE){
    const grid = document.getElementById("grid_view");
    document.querySelector(".result-info").innerHTML = `<strong>${products.length}</strong> produits trouvés`

    if(products.length === 0){
        grid.innerHTML = "<p style='padding:40px; color:red'>Aucun produits trouvés.</p>";
        return;
    }
    const startSlice = (currentPage - 1) * PRODUCTS_PER_PAGE ;
    const endSlice = startSlice + PRODUCTS_PER_PAGE;
    const productsSliced = products.slice(startSlice, endSlice);

    grid.innerHTML = productsSliced.map(p => buildCard(p)).join("");
}

function buildCard(p){
    const badgeClass = getBadgeClass(p.collection);
    const visualContent = p.image
    ? `<img src="${p.image}" alt="${p.nom}"/>`
    : `<div class="p-visual-ph">${getFamilleEmoji(p.famille)}</div>
        <div class="p-visual-brand">Éclats D'essences</div>`;

    const noteTags = p.notes
    .map(n => `<span class="p-note-tag">${n}</span>`)
    .join("");

    const { dotClass, dotTitle, btnClass, btnLabel } = getStockInfo(p.stock);

    const starsHtml = buildStars(p.note);

    return `
            <div class="p-card">
                <div class="p-badge ${badgeClass}">${p.collection}</div>
                    <a href="#" class="p-wish">♡</a>
                        <div class="p-visual">
                            ${visualContent}
                        </div>
                        <div class="p-body">
                            <div class="p-stars"><span class="sg">${starsHtml}</span><span class="sn">(${p.note})</span></div>
                            <div class="p-name">${p.nom}</div>
                            <div class="p-meta">${p.famille} · ${p.genre} · ${p.volume}</div>
                            <div class="p-notes">${noteTags}</div>
                            <div class="p-footer">
                                <div class="p-price">${p.prix}€</div>
                                <div style="display:flex;align-items:center;gap:8px">
                                    <div class="stock-dot ${dotClass}" title="${dotTitle}"></div>
                                    <button class="add-btn ${btnClass}" ${btnClass === "out" ? "disabled" : ""}>
                                        ${btnLabel}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
}

function buildStars(score){
    if(score < 0 || score > 5){
        throw new Error("Le score du produit est un chiffre inexploitable !");
    }
    try{
        const scoreFloor = Math.floor(score);
        let scoreFinal = "";
        for(let i = 0; i < scoreFloor; i++){
            scoreFinal += "★"
        }
        return scoreFinal;
    }catch(error){
        console.error("Une erreur est survenue lors de l'attribution des étoiles(score) produit", error);
    }
}

function getStockInfo(stock){
    try{
                if(stock <= 0){
            return { dotClass: "d-out", dotTitle: "Indisponible", btnClass: "out", btnLabel: "Rupture"};
        }else if(stock <= 5)
        {
            return { dotClass: "d-low", dotTitle: `Stock: ${stock}`, btnClass: "", btnLabel: "+ Panier"};
        }else{
            return { dotClass: "d-ok", dotTitle: `Stock: ${stock}`, btnClass: "", btnLabel: "+ Panier"};
        }
    }catch (error){
        console.error("Une erreur est survenue lors de l'attribution des stocks", error);
    }
}

function getBadgeClass(collection) {
  const map = {
    "Signature":  "badge-sig",
    "Prestige":   "badge-pres",
    "Évasion":  "badge-eva",
    "Hiver":  "badge-hiv",
    "Été":  "badge-ete",
    "Nouveauté":  "badge-new",
    "Édition Limitée":  "badge-limi",
    "Promotion":  "badge-promo"
  };
  return map[collection] || "badge-new";
}

function getFamilleEmoji(famille) {
    const map = {
        "Oriental":  "🪬",
        "Floral":   "🌸",
        "Boisé":  "🌲",
        "Frais":  "🌊",
        "Épicé":  "🌶️",
        "Citrus":  "🍋"
    };
    return map[famille] || "🌲";
}