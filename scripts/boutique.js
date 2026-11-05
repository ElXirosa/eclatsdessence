import { renderProducts } from "./boutique/render.js";
import { renderPagination } from "./boutique/pagination.js";
import "./boutique/animation.js";
import { animateCards } from "./boutique/animation.js";
import "./boutique/sort.js";
import "./boutique/filter.js";

const API_URL = "./data/db.json";
export const STATEMENT = {
    allProducts: [],
    PRODUCTS_PER_PAGE: 12,
    currentPage: 1,
    arrayIsFiltered: false,
    filteredArray: []
}

fetchProducts()
async function fetchProducts(){
    try{
        const response = await fetch(API_URL);
        const json = await response.json();
        const data = json.products
        STATEMENT.allProducts = data;
        renderProducts(data, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE);
        animateCards();
        stockInfo(data);
        renderPagination(data);

    } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
        document.getElementById("grid_view").innerHTML =
        "<p style='color: red;'>Impossible de charger les éléments de l'API</p>";
    }
}

function stockInfo(products){
    try{
        const productsList = [...products];
        const spansInfo = document.querySelectorAll(".chk-count");
        document.querySelector("#h-stat-p").innerHTML = `<strong>${productsList.length}</strong><span>Parfums</span>`
        document.querySelector("#h-stat-f").innerHTML = `<strong>${spansInfo.length}</strong><span>Familles</span>`

        spansInfo.forEach(span => {
            let dataId = span.dataset.id;
            let famille = dataId.slice(1);
            let filtred = productsList.filter((p) => p.famille === famille);
            span.innerText = filtred.length;
        });

    }catch(error) {
        console.error("Une erreur est survenue lors de l'affichage des stock de famille olfactives", error);
    }
}