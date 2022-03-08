import { Injectable } from '@angular/core';
import { Language } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends CrudApiService<Language> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'languages');
  }

  // CRUD
  create(model: Language): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<Language> {
    return super.getById(id);
  }

  update(id: number, model: Language): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Language>['query']): Observable<PaginatedResult<Language>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Language[]> {
    return super.findAll();
  }

}