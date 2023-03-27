import { richiesteFetch } from '../BL/sitoWebBL.js';
import { creaItem } from './FunzioniComuni.js';
import '../utils/helperArray.js';
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
        document.getElementById('bottoneCerca').addEventListener('click', () => {
            const inputCerca = document.getElementById('inputCerca');
            const value = inputCerca.value[0];
            const prodottiPromise = richiesteFetch.getProdotti(null, value, null, null);
            prodottiPromise.then((prodotti) => {
                prodotti.forEach((prodotto, index) => {
                    lista.appendChild(creaItem(prodotto, (index % 6) + 1, categorieNomiId));
                });
            });
        });
    });
};
