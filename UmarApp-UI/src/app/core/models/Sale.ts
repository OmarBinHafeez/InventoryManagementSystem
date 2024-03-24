export interface Sale {
  id: string; 
  productId: string; 
  quantity: number;
  price: number;
  totalAmount: number;
  saleDate?: string;
}

export interface SaleDto {
  productId: string;
  quantity: number;
  price: number;
  totalAmount: number;
  saleDate: string;
}

export interface SaleOutputDto {
  id: string; 
  productId: string; 
  productName: string; 
  quantity: number;
  price: number;
  totalAmount: number;
  saleDate?: string;
}
