export interface Categoria {
  categoryId: number;
  categoryName: string;
}

export interface Prodotto {
  productId: number;
  productName: string;
  categoryId: number;
  unitPrice: number;
  unitsInStock: number;
  discontinued: boolean;
}

export interface ProdottoPost {
  idProdotto: number;
  productName: string;
  unitPrice: number;
  idCarrello: number;
}
