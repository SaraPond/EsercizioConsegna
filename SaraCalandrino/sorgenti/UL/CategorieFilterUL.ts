import { richiesteFetch } from '../BL/sitoWebBL.js';
import { Categoria, Prodotto } from '../Tipi/CategoriaProdotto.js';
import { creaItem } from './FunzioniComuni.js';
import '../utils/helperArray.js';

window.onload = () => {
  const lista: HTMLDivElement = document.getElementById('listaProdotti') as HTMLDivElement;
  const select: HTMLSelectElement = document.getElementById('selectCategorie') as HTMLSelectElement;

  const categoriePromise: Promise<Categoria[]> = richiesteFetch.getCategoriaFetch();
  let categorieNomiId: { id: number; nome: string }[] = [];

  categoriePromise.then((categorie: Categoria[]) => {
    categorie.creaOptions(select, 'categoryId', 'categoryName');
    categorie.forEach((categoria: Categoria) => {
      categorieNomiId.push({
        id: categoria.categoryId,
        nome: categoria.categoryName,
      });
    });

    (document.getElementById('selectCategorie') as HTMLSelectElement).addEventListener('change', () => {
      const value: number = Number(select.value);
      // const prodottiPromise: Promise<Prodotto[]> = richiesteFetch.getProdottiPerCategoria(value);
      const prodottiPromise: Promise<Prodotto[]> = richiesteFetch.getProdotti(value, null, null, null);

      prodottiPromise.then((prodotti: Prodotto[]) => {
        lista.innerHTML = ''; // Rimuove gli elementi precedenti dalla lista
        prodotti.forEach((prodotto: Prodotto, index: number) => {
          lista.appendChild(creaItem(prodotto, (index % 6) + 1, categorieNomiId));
        });
      });
    });
  });
};
