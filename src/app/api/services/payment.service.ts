import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse } from '@models/routes/base-route.models';
import { BaseApiService } from './base/base-api-service';
import { PaymentResponse } from '@models/entities/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseApiService {

  constructor(private httpClient: HttpClient) {
    super('payment');
  }

  requestPaymentId(subscriptionId: number, type: number): Observable<OkResponse> {
    return this.httpClient.get(`${this.url}/request/${subscriptionId}?type=${type}`);
  }

  changePaymentMethod(subscriptionId: number, type: number): Observable<OkResponse> {
    return this.httpClient.get(`${this.url}/change-payment-method/${subscriptionId}?type=${type}`);
  }

  getEftStatus(subscriptionId: number): Observable<PaymentResponse> {
    return this.httpClient.get<PaymentResponse>(`${this.url}/status/${subscriptionId}?type=1`);
  }

  getPeachPaymentStatus(subscriptionId: number): Observable<PaymentResponse> {
    return this.httpClient.get<PaymentResponse>(`${this.url}/status/${subscriptionId}?type=2`);
  }

  // Testing only
  verifyTestPayment(subscriptionId: number, params: { id: string, resourcePath: string, testing: boolean }): Observable<PaymentResponse> {
    return this.httpClient.post<PaymentResponse>(`${this.url}/callback/${subscriptionId}`, null, { params: this.toHttpParams(params) });
  }

}
