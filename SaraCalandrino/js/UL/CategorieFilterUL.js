import { richiesteFetch } from '../BL/sitoWebBL.js';
import { creaItem } from './FunzioniComuni.js';
import '../utils/helperArray.js';
window.onload = () => {
    const lista = document.getElementById('listaProdotti');
    const select = document.getElementById('selectCategorie');
    const categoriePromise = richiesteFetch.getCategoriaFetch();
    let categorieNomiId = [];
    categoriePromise.then((categorie) => {
        categorie.creaOptions(select, 'categoryId', 'categoryName');
        categorie.forEach((categoria) => {
            categorieNomiId.push({
                id: categoria.categoryId,
                nome: categoria.categoryName,
            });
        });
        document.getElementById('selectCategorie').addEventListener('change', () => {
            const value = Number(select.value);
            // const prodottiPromise: Promise<Prodotto[]> = richiesteFetch.getProdottiPerCategoria(value);
            const prodottiPromise = richiesteFetch.getProdotti(value, null, null, null);
            prodottiPromise.then((prodotti) => {
                lista.innerHTML = ''; // Rimuove gli elementi precedenti dalla lista
                prodotti.forEach((prodotto, index) => {
                    lista.appendChild(creaItem(prodotto, (index % 6) + 1, categorieNomiId));
                });
            });
        });
    });
};
