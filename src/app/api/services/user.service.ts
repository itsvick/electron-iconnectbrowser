import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiService } from './base/crud-api-service';
import { User } from '@models/entities';
import { PaginatedResult } from 'app/shared/models/pagination';
import { FindAndCountAllRequest, OkResponse } from '@models/routes/base-route.models';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudApiService<User> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  // CRUD
  create(model: User): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<User> {
    return super.getById(id);
  }

  update(id: number, model: User): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<User>['query']): Observable<PaginatedResult<User>> {
    return super.findAndCountAll(options);
  }

  getProfile(): Observable<User> {
    // return this.http.get<User>(`${ this.url }/me`);
    return;
  }
}
