import { STATEMENT } from "../boutique.js";
import { renderProducts } from "./render.js";
import { renderPagination } from "./pagination.js";

const selectTri = document.querySelector(".toolbar-r");
    selectTri.addEventListener("change", (event) =>{
    const valeurChoisie = event.target.value;
    let productsBeforeSort = [];
    if(STATEMENT.arrayIsFiltered === false){
        productsBeforeSort = [...STATEMENT.allProducts];
    }else{
        productsBeforeSort = [...STATEMENT.filteredArray];
    }
    let sorted = [];

    switch (valeurChoisie) {
        case "Prix croissant":
            STATEMENT.currentPage = 1;
            sorted = productsBeforeSort.sort((a, b) => a.prix - b.prix);
             renderProducts(sorted, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE);
             renderPagination(sorted);
            break;
        case "Prix décroissant":
            STATEMENT.currentPage = 1;
            sorted = productsBeforeSort.sort((a, b) => b.prix - a.prix);
            renderProducts(sorted, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE);
            renderPagination(sorted);
            break;
        case "Nom A–Z":
            STATEMENT.currentPage = 1;
            sorted = productsBeforeSort.sort((a, b) => a.nom.localeCompare(b.nom));
            renderProducts(sorted, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE);
            renderPagination(sorted);
            break;
        case "Meilleures notes":
            STATEMENT.currentPage = 1;
            sorted = productsBeforeSort.sort((a, b) => b.note - a.note);
            renderProducts(sorted, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE);
            renderPagination(sorted);
            break;
        default:
            STATEMENT.currentPage = 1;
            renderProducts(productsBeforeSort, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE);
            renderPagination(productsBeforeSort, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE)
    }
});