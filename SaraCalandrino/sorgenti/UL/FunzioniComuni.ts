import { Prodotto } from '../Tipi/CategoriaProdotto';

export function creaItem(
  oggetto: Prodotto,
  i: number,
  categorieNomiId: { id: number; nome: string }[]
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement('div') as HTMLDivElement;
  div.setAttribute('class', 'col-sm-12 col-md-4 col-lg-3 mb-3 border');
  let immagine: HTMLDivElement = document.createElement('div') as HTMLDivElement;
  immagine.setAttribute('class', 'row');

  let didascalia: HTMLDivElement = document.createElement('div') as HTMLDivElement;
  didascalia.setAttribute('class', 'row');
  let img: HTMLImageElement = document.createElement('img') as HTMLImageElement;

  let url = `immagini\\${i}.jpg`;
  img.src = url;
  immagine.appendChild(img);

  for (const key in oggetto) {
    const testo: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    testo.setAttribute('class', 'col-12');
    if (key == 'productName' || key == 'unitPrice' || key == 'unitsInStock') {
      testo.innerText = `${key} : ${oggetto[key]}`;
    }
    if (key == 'categoryId') {
      for (const k in categorieNomiId) {
        if (categorieNomiId[k].id == oggetto[key]) {
          testo.innerText = `${'categoria'} : ${categorieNomiId[k].nome}`;
        }
      }
    }
    didascalia.appendChild(testo);
  }

  div.appendChild(immagine);
  let link: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
  link.innerText = 'Aggiungi al carrello';
  link.href = '#';
  link.style.color = 'brown';
  link.style.textAlign = 'center';
  didascalia.appendChild(link);
  div.appendChild(didascalia);

  return div;
}
