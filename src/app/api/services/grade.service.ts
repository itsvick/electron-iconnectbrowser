import { Injectable } from '@angular/core';
import { Grade } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';
import { GradeBySubject } from '@api/models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService extends CrudApiService<Grade> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'grades');
  }

  // CRUD
  create(model: Grade): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<Grade> {
    return super.getById(id);
  }

  update(id: number, model: Grade): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  getMyGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.url}/me`);
  }

  getBySubjectId(subjectId: number): Observable<GradeBySubject[]> {
    return this.http.get<GradeBySubject[]>(`${this.url}/subject/${subjectId}`);
  }
  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Grade>['query']): Observable<PaginatedResult<Grade>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Grade[]> {
    return super.findAll();
  }

}
