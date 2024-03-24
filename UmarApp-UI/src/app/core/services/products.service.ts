import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Assuming you have a Product interface defined for your data model
import { Product, ProductDto } from '../models/Product';
import { environment } from '../../../enviroments/enviroment';

const API_BASE_URL = environment.apiBaseUrl; 

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  private getHeadersWithAuth(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      throw new Error('No JWT token found');
    }

    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  
  getProducts(): Observable<Product[]> {
    const headers = this.getHeadersWithAuth();
    return this.http.get<Product[]>(`${API_BASE_URL}Products`, { headers });
  }

  getProductById(id: string): Observable<Product> {
    const headers = this.getHeadersWithAuth();
    return this.http.get<Product>(`${API_BASE_URL}Products/${id}`, { headers });
  }

  addProduct(product: ProductDto): Observable<ProductDto> {
    const headers = this.getHeadersWithAuth();
    return this.http.post<ProductDto>(`${API_BASE_URL}Products`, product, { headers });
  }

  updateProduct(product: Product): Observable<void> {
    const headers = this.getHeadersWithAuth();
    return this.http.put<void>(`${API_BASE_URL}Products/${product.id}`, product, { headers });
  }

  deleteProduct(id: string): Observable<void> {
    const headers = this.getHeadersWithAuth();
    return this.http.delete<void>(`${API_BASE_URL}Products/${id}`, { headers });
  }
}
