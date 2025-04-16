import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OrderRequest, OrderResponse, OrderHistoryResponse } from '../models/order.model';
import { MemberStatusResponse } from '../models/member-status.model';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // API URL for the backend service
  // private apiUrl = 'http://localhost:8080/api'; // Local development URL
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  // Constructor to inject HttpClient
  placeOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/orders`, orderRequest);
  }

  // Method to get the order status by order number
  calculateAndUpdateMemberStatus(userId: string, orderNumber: string): Observable<MemberStatusResponse> {
    return this.http.post<MemberStatusResponse>(`${this.apiUrl}/member-status/calculate`, {userId, orderNumber});
  }

  // Method to fetch the member status by UUID
  fetchMemberStatus(uuid: string): Observable<MemberStatusResponse | null> {
    return this.http.get<MemberStatusResponse>(`${this.apiUrl}/member-status/${uuid}`).pipe(
      // Tap is used for side effects, like logging
      // Here we log the fetched member status to the console
      tap(status => console.log('Fetched member status:', status)),
      catchError(error => {
        console.error('Failed to fetch member status:', error);
        return of(null);
      })
    );
  }

  getOrderHistory(userId: string, page: number, size: number): Observable<OrderHistoryResponse> {
    const url = `${this.apiUrl}/orders?userId=${userId}&page=${page}&size=${size}`;
    return this.http.get<OrderHistoryResponse>(url);
  }

}
