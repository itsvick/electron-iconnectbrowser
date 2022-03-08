import { Injectable } from '@angular/core';
import { Order } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends CrudApiService<Order> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'orders');
  }

  // CRUD
  create(model: Order): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<Order> {
    return super.getById(id);
  }

  update(id: number, model: Order): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Order>['query']): Observable<PaginatedResult<Order>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Order[]> {
    return super.findAll();
  }

}