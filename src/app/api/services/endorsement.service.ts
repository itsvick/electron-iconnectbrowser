import { Injectable } from '@angular/core';
import { CrudApiService } from './base/crud-api-service';
import { Endorsement } from '@models/entities';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { FileInfo } from '@shared/models/file-info';
import { FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';
import { ResourceUrl } from '@api/models/resource.model';

@Injectable({
  providedIn: 'root',
})
export class EndorsementService extends CrudApiService<Endorsement> {
  constructor(public http: HttpClient) {
    super(http, 'endorsements');
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Endorsement>['query']): Observable<PaginatedResult<Endorsement>> {
    return super.findAndCountAll(options);
  }

  getImage(endorsementId: number): Observable<ResourceUrl> {
    return this.http.get<ResourceUrl>(`${this.url}/${endorsementId}/image`);
  }
}
