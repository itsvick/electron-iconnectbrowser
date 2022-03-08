import { Injectable } from '@angular/core';
import { Curriculum } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService extends CrudApiService<Curriculum> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'curricula');
  }

  // CRUD
  create(model: Curriculum): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<Curriculum> {
    return super.getById(id);
  }

  update(id: number, model: Curriculum): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Curriculum>['query']): Observable<PaginatedResult<Curriculum>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Curriculum[]> {
    return super.findAll();
  }

}