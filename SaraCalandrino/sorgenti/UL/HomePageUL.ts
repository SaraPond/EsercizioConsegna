import { richiesteFetch } from '../BL/sitoWebBL.js';
import { Categoria, Prodotto } from '../Tipi/CategoriaProdotto.js';
import { creaItem } from './FunzioniComuni.js';

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
  });

  const prodottiPromise: Promise<Prodotto[]> = richiesteFetch.getProdottiFetch();
  prodottiPromise.then((prodotti: Prodotto[]) => {
    prodotti.forEach((prodotto: Prodotto, index: number) => {
      lista.appendChild(creaItem(prodotto, (index % 6) + 1, categorieNomiId));
    });
  });
};
