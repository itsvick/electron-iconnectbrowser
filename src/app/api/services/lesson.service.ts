import { Injectable } from '@angular/core';
import { Language, Lesson, UserLesson } from '@models/entities';
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
export class LessonService extends CrudApiService<Lesson> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'lessons');
  }

  // CRUD
  create(model: Lesson): Observable<Lesson> {
    return super.createAndReturn(model);
  }

  getById(id: number): Observable<Lesson> {
    return super.getById(id);
  }

  update(id: number, model: Lesson): Observable<Lesson> {
    return super.updateAndReturn(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Lesson>['query']): Observable<PaginatedResult<Lesson>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Lesson[]> {
    return super.findAll();
  }

  getMyLessons(gradeId: number, subjectId: number) {
    return this.http.get<UserLesson[]>(`${this.url}/me?gradeId=${gradeId}&subjectId=${subjectId}`);
  }

  getVideo(lessonId: number): Observable<ResourceUrl> {
    return this.http.get<ResourceUrl>(`${this.url}/${lessonId}/video`);
  }

  getPdf(lessonId: number): Observable<ResourceUrl> {
    return this.http.get<ResourceUrl>(`${this.url}/${lessonId}/pdf`);
  }

  getThumbnailUrl(lessonId: number): Observable<ResourceUrl> {
    return this.http.get<ResourceUrl>(`${this.url}/${lessonId}/thumbnail`);
  }

  uploadVideo(video: any, fileInfo: FileInfo) {
    const formData = this.buildBlob(video, fileInfo);

    if (formData.has('file')) {
      return this.http.post('lessons/upload/video', formData);
    } else {
      return of('form data does not have all components needed');
    }
  }

  uploadPdf(pdf: any, fileInfo: FileInfo) {
    const formData = this.buildBlob(pdf, fileInfo);

    if (formData.has('file')) {
      return this.http.post('lessons/upload/pdf', formData);
    } else {
      return of('form data does not have all components needed');
    }
  }

  buildBlob(media: any, fileInfo: FileInfo): FormData {
    const formData = new FormData();
    const blob = new Blob([media], { type: fileInfo.type });

    formData.append('file', blob);

    for (const key in fileInfo) {
      if (key) {
        formData.append(key, fileInfo[key]);
      }
    }

    return formData;
  }
}
