export interface Product {
  id: string;
  name: string;
  description?: string; 
  quantity: number;
  price: number;
}


export interface ProductDto {
  name: string;
  description?: string;
  quantity: number;
  price: number;
}