import { Injectable } from '@angular/core';
import { CrudApiService } from './base/crud-api-service';
import { Video } from '@models/entities';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';


@Injectable({
  providedIn: 'root'
})
export class VideoService extends CrudApiService<Video> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'videos');
  }

  // CRUD
  create(model: Video): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<Video> {
    return super.getById(id);
  }

  update(id: number, model: Video): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Video>['query']): Observable<PaginatedResult<Video>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Video[]> {
    return super.findAll();
  }
}
