import { Injectable } from '@angular/core';
import { Subject } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';
import { ResourceUrl } from '@api/models/resource.model';
import { MySubjectResponse, SubjectStats } from '@api/models/subject.modle';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService extends CrudApiService<Subject> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'subjects');
  }

  // CRUD
  create(model: Subject): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<Subject> {
    return super.getById(id);
  }

  update(id: number, model: Subject): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  getMySubjectsFiltered(subjectId?: number): Observable<MySubjectResponse[]> {
    return this.http.get<MySubjectResponse[]>(`${ this.url }/me`, {
      params: { subjectId: `${ subjectId }` }
    }).pipe(map(subjects => _.uniqBy(subjects, s => s.id)));
  }

  getMySubjects(subjectId?: number): Observable<MySubjectResponse[]> {
 
    const params = subjectId ? { subjectId: `${ subjectId }`} : {};
    let paramsWithUrl = '';
    if (!params) {
      paramsWithUrl = `${this.url}/me?${params.toString()}`;
    } else {
      paramsWithUrl = `${this.url}/me`;
    }

    return this.http.get<MySubjectResponse[]>(`${ this.url }/me`, { params });
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Subject>['query']): Observable<PaginatedResult<Subject>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Subject[]> {
    return super.findAll();
  }

  getVideo(subjectId: number): Observable<ResourceUrl> {
    const url = `${ this.url }/${ subjectId }/video`;
    return this.http.get<ResourceUrl>(url);
  }

  getStats(languageId: number = 1, subjectIds?: number): Observable<SubjectStats[]> {
    let url = `${ this.url }/stats?languageId=${ languageId }`;
    if (subjectIds) {
      url = `${ this.url }/stats?languageId=${ languageId }?subjectIds=${ subjectIds }`;
    }

    return this.http.get<SubjectStats[]>(url);
  }
}
