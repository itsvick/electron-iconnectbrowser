import { Injectable } from '@angular/core';
import { School, User } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SchoolService extends CrudApiService<School> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'schools');
  }

  // CRUD
  create(model: School): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<School> {
    return super.getById(id);
  }

  update(id: number, model: School): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<School>['query']): Observable<PaginatedResult<School>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<School[]> {
    return super.findAll();
  }

  findOrCreate(model: School): Observable<School> {
    return super.findOrCreate(model);
  }

}
