import { richiesteFetch } from '../BL/sitoWebBL.js';
import { Categoria, Prodotto } from '../Tipi/CategoriaProdotto.js';
import { creaItem } from './FunzioniComuni.js';
import '../utils/helperArray.js';

window.onload = () => {
  const lista: HTMLDivElement = document.getElementById('listaProdotti') as HTMLDivElement;
  const categoriePromise: Promise<Categoria[]> = richiesteFetch.getCategoriaFetch();
  let categorieNomiId: { id: number; nome: string }[] = [];

  categoriePromise.then((categorie: Categoria[]) => {
    categorie.forEach((categoria: Categoria) => {
      categorieNomiId.push({
        id: categoria.categoryId,
        nome: categoria.categoryName,
      });
    });

    (document.getElementById('bottoneCerca') as HTMLButtonElement).addEventListener('click', () => {
      const inputCerca: HTMLInputElement = document.getElementById('inputCerca') as HTMLInputElement;
      const value: string = inputCerca.value[0];

      const prodottiPromise: Promise<Prodotto[]> = richiesteFetch.getProdotti(null, value, null, null);

      prodottiPromise.then((prodotti: Prodotto[]) => {
        prodotti.forEach((prodotto: Prodotto, index: number) => {
          lista.appendChild(creaItem(prodotto, (index % 6) + 1, categorieNomiId));
        });
      });
    });
  });
};
