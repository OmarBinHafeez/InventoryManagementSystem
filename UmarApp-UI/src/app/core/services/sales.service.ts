import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Assuming you have a Sale interface defined for your data model
import { Sale, SaleDto, SaleOutputDto } from '../models/Sale';
import { environment } from '../../../enviroments/enviroment';

const API_BASE_URL = environment.apiBaseUrl;

@Injectable()
export class SalesService {

  constructor(private http: HttpClient) { }

  private getHeadersWithAuth(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      throw new Error('No JWT token found');
    }

    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  
  getSales(): Observable<SaleOutputDto[]> {
    const headers = this.getHeadersWithAuth();
    return this.http.get<SaleOutputDto[]>(`${API_BASE_URL}Sales`, { headers });
  }

  getSaleById(id: string): Observable<Sale> {
    const headers = this.getHeadersWithAuth();
    return this.http.get<Sale>(`${API_BASE_URL}Sales/${id}`, { headers });
  }

  addSale(sale: SaleDto): Observable<SaleDto> {
    const headers = this.getHeadersWithAuth();
    return this.http.post<SaleDto>(`${API_BASE_URL}Sales`, sale, { headers });
  }

  updateSale(sale: Sale): Observable<void> {
    const headers = this.getHeadersWithAuth();
    return this.http.put<void>(`${API_BASE_URL}Sales/${sale.id}`, sale, { headers });
  }

  deleteSale(id: string): Observable<void> {
    const headers = this.getHeadersWithAuth();
    return this.http.delete<void>(`${API_BASE_URL}Sales/${id}`, { headers });
  }
}
