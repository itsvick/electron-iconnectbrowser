import { Injectable } from '@angular/core';
import { Country } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends CrudApiService<Country> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'countries');
  }

  // CRUD
  create(model: Country): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<Country> {
    return super.getById(id);
  }

  update(id: number, model: Country): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Country>['query']): Observable<PaginatedResult<Country>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Country[]> {
    return super.findAll();
  }

}