import { Categoria, Prodotto, ProdottoPost } from '../Tipi/CategoriaProdotto.js';
import { creaItem } from '../UL/FunzioniComuni.js';

export namespace richiesteFetch {
  export function getProdottiFetch(): Promise<Prodotto[]> {
    return fetch('http://82.59.202.23/northwindwebapi/api/prodotti').then((r) => r.json());
  }

  export function getCategoriaFetch(): Promise<Categoria[]> {
    return fetch('http://82.59.202.23/northwindwebapi/api/categorie').then((r) => r.json());
  }

  export function getProdotti(idCategoria: any, lettera: any, prezzoMin: any, prezzoMax: any): Promise<Prodotto[]> {
    return fetch('http://82.59.202.23/northwindwebapi/api/prodotti')
      .then((response) => response.json()) //prende i prodotti
      .then(
        (response) =>
          new Promise((resolve, reject) => {
            if (idCategoria) resolve(filtraCategoria(response, idCategoria));
            else if (lettera) {
              // alert(lettera);
              resolve(filtraLettera(response, lettera));
            } else if (prezzoMin) resolve(filtraPrezzo(response, prezzoMin, prezzoMax));
            else resolve(response);
          })
      );
  }

  export function login() {
    return fetch('http://82.59.202.23/northwindwebapi/api/login', {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + 'Sara:Calandrino',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        return data;
      });
  }

  export function aggiungiCarello(prodotto: Prodotto) {
    const data: ProdottoPost = {
      idProdotto: 1,
      productName: 'pippo',
      unitPrice: 1,
      idCarrello: 0,
    };

    fetch('http://82.59.202.23/northwindwebapi/api/Carrello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  // export function getProdottiPerNome(lettera: string): Promise<Prodotto[]> {
  //   return fetch('http://82.59.202.23/northwindwebapi/api/prodotti')
  //     .then((response) => response.json()) //prende i prodotti
  //     .then(
  //       (response) =>
  //         new Promise((resolve, reject) => {
  //           alert(lettera);
  //           if (lettera) resolve(filtraLettera(response, lettera));
  //           else resolve(response);
  //         })
  //     );
  // }

  // export function getProdottiPerPrezzo(lettera: string): Promise<any> {
  //   return fetch('http://82.59.202.23/northwindwebapi/api/prodotti')
  //     .then((response) => response.json()) //prende i prodotti
  //     .then(
  //       (response) =>
  //         new Promise((resolve, reject) => {
  //           if () resolve(filtraPrezzo());
  //           else resolve(response);
  //         })
  //     );
  // }

  function filtraCategoria(prodotti: Prodotto[], idCategoria: number): Prodotto[] {
    const prodottiFiltrati = prodotti.filter((prodotto) => prodotto.categoryId == Number(idCategoria));
    return prodottiFiltrati;
  }

  function filtraLettera(prodotti: Prodotto[], lettera: string): Prodotto[] {
    // alert(lettera);
    const prodottiFiltrati = prodotti.filter(
      (prodotto) => prodotto.productName[0].toUpperCase() == lettera.toUpperCase()
    );
    return prodottiFiltrati;
  }

  function filtraPrezzo(prodotti: Prodotto[], min: number, max: number): Prodotto[] {
    const prodottiFiltrati = prodotti.filter((prodotto) => prodotto.unitPrice >= min && prodotto.unitPrice <= max);
    return prodottiFiltrati;
  }
}
