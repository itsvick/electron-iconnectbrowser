import { Injectable } from '@angular/core';
import { Keyword, Question , Lesson } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  OkResponse,
  FindAndCountAllRequest
} from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';
import { Filter } from '@shared/models/filter';

export interface KeywordSearchResults {
  questions: Question[];
  difficulties: number[];
  keywords: SearchKeyword[];
}

export interface SearchKeyword {
  id: number;
  name: string;
  count: number;
}


@Injectable({
  providedIn: 'root'
})
export class KeywordService extends CrudApiService<Keyword> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'keywords');
  }

  // CRUD
  create(model: Keyword): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<Keyword> {
    return super.getById(id);
  }

  update(id: number, model: Keyword): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(
    options?: FindAndCountAllRequest<Keyword>['query']
  ): Observable<PaginatedResult<Keyword>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Keyword[]> {
    return super.findAll();
  }

  getAllByPaperIds(paperIds: number[], search?: string): Observable<KeywordSearchResults> {
    let params = new HttpParams();
    params = params.append('paperIds', JSON.stringify(paperIds));
    if (search) {
      params = params.append('phrase', search);
    }
    return this.http.get<KeywordSearchResults>(`${this.url}/questions-by-paper`, { params });
  }

  getPapers(filter: Filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('filter', JSON.stringify(filter));
    return this.http.get<any>(`${this.url}/getPapers`, { params });
  }

  getLessons(filter: Filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('filter', JSON.stringify(filter));
    return this.http.get<any>(`${this.url}/getLessons`, { params });
  }

  getLessonsByKeyword(gradeId: number, subjectId: number, keywordId: number): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.url}/lessonsByKeywordId`, {
      id: keywordId,
      gradeId: gradeId,
      subjectId: subjectId,
    });
  }

  getKeywordsByLessons(lessonIds: number[], phrase: string, gradeId: number, subjectId: number): Observable<Keyword[]> {
    return this.http.post<Keyword[]>(`${this.url}/lessonKeywords`, {
      phrase: phrase,
      lessonIds: lessonIds,
      gradeId: gradeId,
      subjectId: subjectId,
    });
  }
}
