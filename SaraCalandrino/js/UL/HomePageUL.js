import { richiesteFetch } from '../BL/sitoWebBL.js';
import { creaItem } from './FunzioniComuni.js';
window.onload = () => {
    const lista = document.getElementById('listaProdotti');
    const categoriePromise = richiesteFetch.getCategoriaFetch();
    let categorieNomiId = [];
    categoriePromise.then((categorie) => {
        categorie.forEach((categoria) => {
            categorieNomiId.push({
                id: categoria.categoryId,
                nome: categoria.categoryName,
            });
        });
    });
    const prodottiPromise = richiesteFetch.getProdottiFetch();
    prodottiPromise.then((prodotti) => {
        prodotti.forEach((prodotto, index) => {
            lista.appendChild(creaItem(prodotto, (index % 6) + 1, categorieNomiId));
        });
    });
};
