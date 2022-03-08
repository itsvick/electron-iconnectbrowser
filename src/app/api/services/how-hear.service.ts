import { Injectable } from '@angular/core';
import { HowHear } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class HowHearService extends CrudApiService<HowHear> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'how-hear');
  }

  // CRUD
  create(model: HowHear): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<HowHear> {
    return super.getById(id);
  }

  update(id: number, model: HowHear): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<HowHear>['query']): Observable<PaginatedResult<HowHear>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<HowHear[]> {
    return super.findAll();
  }

}