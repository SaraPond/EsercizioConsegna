interface Array<T> {
  creaOptions(select: HTMLSelectElement, key: string, value: string): void;
}

Array.prototype.creaOptions = function (select: HTMLSelectElement, key: string, value: string) {
  for (let i = 0; i < this.length; i++) {
    const option = document.createElement('option');
    const testo = document.createTextNode(this[i][value]);
    option.appendChild(testo);
    option.setAttribute('value', this[i][key]);
    select.appendChild(option);
  }
};
