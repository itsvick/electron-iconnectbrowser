import { Injectable } from '@angular/core';
import { CrudApiService } from './base/crud-api-service';
import { VideoBookmark } from '@models/entities';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class VideoBookmarkService extends CrudApiService<VideoBookmark> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'video-bookmarks');
  }

  // CRUD
  create(model: VideoBookmark): Observable<VideoBookmark> {
    return super.createAndReturn(model);
  }

  getById(id: number): Observable<VideoBookmark> {
    return super.getById(id);
  }

  update(id: number, model: VideoBookmark): Observable<VideoBookmark> {
    return super.updateAndReturn(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<VideoBookmark>['query']): Observable<PaginatedResult<VideoBookmark>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<VideoBookmark[]> {
    return super.findAll();
  }
}
