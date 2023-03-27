export function creaItem(oggetto, i, categorieNomiId) {
    const div = document.createElement('div');
    div.setAttribute('class', 'col-sm-12 col-md-4 col-lg-3 mb-3 border');
    let immagine = document.createElement('div');
    immagine.setAttribute('class', 'row');
    let didascalia = document.createElement('div');
    didascalia.setAttribute('class', 'row');
    let img = document.createElement('img');
    let url = `immagini\\${i}.jpg`;
    img.src = url;
    immagine.appendChild(img);
    for (const key in oggetto) {
        const testo = document.createElement('div');
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
    let link = document.createElement('a');
    link.innerText = 'Aggiungi al carrello';
    link.href = '#';
    link.style.color = 'brown';
    link.style.textAlign = 'center';
    didascalia.appendChild(link);
    div.appendChild(didascalia);
    return div;
}
