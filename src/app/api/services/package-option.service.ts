import { Injectable } from '@angular/core';
import { PackageOption } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PackageOptionService extends CrudApiService<PackageOption> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'package-options');
  }

  // CRUD
  create(model: PackageOption): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<PackageOption> {
    return super.getById(id);
  }

  update(id: number, model: PackageOption): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<PackageOption>['query']): Observable<PaginatedResult<PackageOption>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<PackageOption[]> {
    return super.findAll();
  }

  pricing(countryId: number, gradeId: number, subjectIds: number[], isAnnual: boolean) {
    let params = new HttpParams();
    params = params.append('countryId', countryId.toString());
    params = params.append('gradeId', gradeId.toString());
    params = params.append('subjects', JSON.stringify(subjectIds));
    params = params.append('isAnnual', isAnnual.toString().toLowerCase());

    return this.http.get<any>(`${this.url}/pricing`, { params });
  }
}