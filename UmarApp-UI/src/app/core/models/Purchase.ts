export interface Purchase {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  totalAmount: number;
  purchaseDate?: string;
}

export interface PurchaseDto {
  productId: string;
  quantity: number;
  price: number;
  totalAmount: number;
  purchaseDate: string;
}

export interface PurchaseOutputDto {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  purchaseDate?: string;
}
