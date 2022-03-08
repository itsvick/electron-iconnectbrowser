import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse } from '@models/routes/base-route.models';
import { BaseApiService } from './base/base-api-service';
import { Subscription, SubscriptionSummary } from '@models/entities';
import { PackageOverview } from '@models/entities/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService extends BaseApiService {
  constructor(private httpClient: HttpClient) {
    super('subscriptions');
  }

  create(
    subscription:
      | Pick<Subscription, 'packageOptions' | 'isAnnual'>
      | Pick<Subscription, 'childSubscriptions' | 'isAnnual'>,
  ): Observable<OkResponse> {
    return this.httpClient.post(`${this.url}`, subscription);
  }

  update(subscription: Pick<Subscription, 'id' | 'isAnnual'>): Observable<SubscriptionSummary> {
    return this.httpClient.put<SubscriptionSummary>(`${this.url}/${subscription.id}/`, subscription);
  }

  updatePackages(subscriptionId: number, packages: Array<PackageOverview>): Observable<SubscriptionSummary> {
    return this.httpClient.put<SubscriptionSummary>(`${this.url}/${subscriptionId}/packages`, packages);
  }

  getSubscriptionSummary(): Observable<SubscriptionSummary> {
    return this.httpClient.get<SubscriptionSummary>(`${this.url}/summary/`);
  }

  updatePackageOptions(subscriptionId: number, packageOptionIds: Array<number>): Observable<any> {
    return this.httpClient.put<SubscriptionSummary>(`${this.url}/${subscriptionId}/package-options`, packageOptionIds);
  }

  setStatusId(subscriptionId: number, statusId: number) {
    return this.httpClient.put<Subscription>(`${this.url}/${subscriptionId}/status`, { statusId });
  }

  upgrade(subjectId: number): Observable<any>  {
    return this.httpClient.post(`${this.url}/${subjectId}/upgrade`, {});
  }

  InitUpgrade(subjectId: number): Observable<any>  {
    return this.httpClient.post(`${this.url}/${subjectId}/init-upgrade`, {});
  }

  getMySubscriptionPackageType(): Observable<any>  {
    return this.httpClient.get(`${this.url}/me/package-type`, {});
  }
}
