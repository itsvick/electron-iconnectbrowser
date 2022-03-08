import { Injectable } from '@angular/core';
import { BaseApiService } from './base/base-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '@models/entities';

@Injectable({
  providedIn: 'root'
})
export class PromotionService extends BaseApiService {
  constructor(private httpClient: HttpClient) {
    super('promotions');
  }

  isValidCode(code: string, subscriptionId: number): Observable<Promotion> {
    return this.httpClient.get<Promotion>(`${this.url}/valid/${code}/${subscriptionId}`);
  }

  setCode(promitionId: number, subscriptionId: number): Observable<Promotion> {
    return this.httpClient.put<Promotion>(`${this.url}/setcode`, { id: promitionId, subscriptionId });
  }

}
