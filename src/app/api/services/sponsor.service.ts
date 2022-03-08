import { Injectable } from '@angular/core';
import { CrudApiService } from './base/crud-api-service';
import { Sponsor } from '@models/entities';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class SponsorService extends CrudApiService<Sponsor> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'sponsors');
  }

  // CRUD
  create(model: Sponsor): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<Sponsor> {
    return super.getById(id);
  }

  update(id: number, model: Sponsor): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Sponsor>['query']): Observable<PaginatedResult<Sponsor>> {
    return super.findAndCountAll(options);
  }

  getLogo(id: number): Observable<{ id: number; url: string }> {
    const url = `${this.url}/logo/${id}`;
    return this.http.get<{ id: number; url: string }>(url);
  }

  getAll(): Observable<Sponsor[]> {
    return super.findAll();
  }
}
