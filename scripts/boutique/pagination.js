import { renderProducts } from "./render.js";
import { STATEMENT } from "../boutique.js";

export function renderPagination(products){
    try{
        console.log(products);
        const numberOfProducts = products.length;
        const paginationDiv = document.querySelector(".pagination");
        const nbCaseNeeded = Math.ceil(numberOfProducts / STATEMENT.PRODUCTS_PER_PAGE);
        let bodyPagninationNbs = "";
        for(let i = 1; i < nbCaseNeeded + 1; i++){
            if(STATEMENT.currentPage == i){
                bodyPagninationNbs += `<a class="pg-btn page-number active">${i}</a>`;
            }else{
                bodyPagninationNbs += `<a class="pg-btn page-number">${i}</a>`;
            }
        }
        let globalPaginationBody = "";
        if(products.length <= STATEMENT.PRODUCTS_PER_PAGE){
            globalPaginationBody = ``;
        }else{
                        globalPaginationBody = `
                <a class="pg-btn arrow">‹</a>
                ${bodyPagninationNbs}
                <a class="pg-btn arrow">›</a>`;;
        }

        paginationDiv.innerHTML = globalPaginationBody;
        listenerPagination();
    }catch(error){
        console.error("Une erreur est survenue lors de l'affichage des bouttons pagination", error);
    }

}

function listenerPagination(){
    try{
                const btnsPagination = document.querySelectorAll(".page-number");
        for(let btn = 0; btn < btnsPagination.length; btn++){
            btnsPagination[btn].addEventListener("click", (event) => {
            STATEMENT.currentPage = parseInt(btnsPagination[btn].innerText);
            renderProducts(STATEMENT.allProducts, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE);
            if(STATEMENT.arrayIsFiltered === false){
               renderPagination(STATEMENT.allProducts);
            }else{
                renderPagination(STATEMENT.filteredArray);
            }
        });
        }

        const btnsArrow = document.querySelectorAll(".arrow");
        for(let a = 0; a < btnsArrow.length; a++){
            btnsArrow[a].addEventListener("click", (event) => {
                if(btnsArrow[a].innerText == "‹" && STATEMENT.currentPage > 1){
                    STATEMENT.currentPage--;
                }else if(btnsArrow[a].innerText == "›" && STATEMENT.currentPage < btnsPagination.length){
                    STATEMENT.currentPage++;
                }
                renderProducts(STATEMENT.allProducts, STATEMENT.currentPage, STATEMENT.PRODUCTS_PER_PAGE);
                if(STATEMENT.arrayIsFiltered === false){
               renderPagination(STATEMENT.allProducts);
                }else{
                renderPagination(STATEMENT.filteredArray);
                }
            });
        }
    }catch(error){
        console.error("Une erreur est survenue lors de l'écoute de la pagination", error);
    }
}