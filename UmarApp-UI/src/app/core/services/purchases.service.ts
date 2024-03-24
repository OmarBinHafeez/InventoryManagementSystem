import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Assuming you have a Purchase interface defined for your data model
import { Purchase, PurchaseDto, PurchaseOutputDto } from '../models/Purchase';
import { environment } from '../../../enviroments/enviroment';

const API_BASE_URL = environment.apiBaseUrl;

@Injectable()
export class PurchasesService {

  constructor(private http: HttpClient) { }

  private getHeadersWithAuth(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      throw new Error('No JWT token found');
    }

    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  
  getPurchases(): Observable<PurchaseOutputDto[]> {
    const headers = this.getHeadersWithAuth();
    return this.http.get<PurchaseOutputDto[]>(`${API_BASE_URL}purchases`, { headers });
  }

  getPurchaseById(id: string): Observable<Purchase> {
    const headers = this.getHeadersWithAuth();
    return this.http.get<Purchase>(`${API_BASE_URL}purchases/${id}`, { headers });
  }

  addPurchase(purchase: PurchaseDto): Observable<PurchaseDto> {
    const headers = this.getHeadersWithAuth();
    return this.http.post<PurchaseDto>(`${API_BASE_URL}purchases`, purchase, { headers });
  }

  updatePurchase(purchase: Purchase): Observable<void> {
    const headers = this.getHeadersWithAuth();
    return this.http.put<void>(`${API_BASE_URL}purchases/${purchase.id}`, purchase, { headers });
  }

  deletePurchase(id: string): Observable<void> {
    const headers = this.getHeadersWithAuth();
    return this.http.delete<void>(`${API_BASE_URL}purchases/${id}`, { headers });
  }
}
