import { Injectable } from '@angular/core';
import { MediaCoverage } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';
import { FileInfo } from '@shared/models/file-info';
import { ResourceUrl } from '@api/models/resource.model';

@Injectable({
  providedIn: 'root',
})
export class MediaCoverageService extends CrudApiService<MediaCoverage> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'media-coverages');
  }

  // CRUD
  create(model: MediaCoverage): Observable<OkResponse> {
    return super.createAndReturn(model);
  }

  getById(id: number): Observable<MediaCoverage> {
    return super.getById(id);
  }

  update(id: number, model: MediaCoverage): Observable<MediaCoverage> {
    return super.updateAndReturn(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(
    options?: FindAndCountAllRequest<MediaCoverage>['query'],
  ): Observable<PaginatedResult<MediaCoverage>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<MediaCoverage[]> {
    return super.findAll();
  }
  getImage(mediaCoverageId: number): Observable<ResourceUrl> {
    return this.http.get<ResourceUrl>(`${this.url}/${mediaCoverageId}/image`);
  }
}
