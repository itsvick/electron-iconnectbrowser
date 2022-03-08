import { Injectable } from '@angular/core';
import { Question, UserQuestion, View } from '@models/entities';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Observer } from 'rxjs';
import { OkResponse, FindAndCountAllRequest } from '@models/routes/base-route.models';
import { PaginatedResult } from '@shared/models/pagination';
import { FileInfo } from '@shared/models/file-info';
import { ResourceUrl } from '@api/models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends CrudApiService<Question> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'questions');
  }

  // CRUD
  create(model: Question): Observable<Question> {
    return super.createAndReturn(model);
  }

  getById(id: number): Observable<Question> {
    return super.getById(id);
  }

  update(id: number, model: Question): Observable<Question> {
    return super.updateAndReturn(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Question>['query']): Observable<PaginatedResult<Question>> {
    return super.findAndCountAll(options);
  }

  getUnaffiliatedPaginated(id: number, options?: FindAndCountAllRequest<Question>['query']): Observable<PaginatedResult<Question>> {
    const params = this.toHttpParams(options || null);
    return this.http.get<PaginatedResult<Question>>(`questions/unaffiliated/${id}`, { params });
  }

  getQuestionTree(question: Question): Observable<Partial<Question[]>> {
    // '/questions/tree/:idCode'
    return this.http.get<Partial<Question[]>>(`questions/tree/${question.idCode}`);
  }

  uploadVideo(video: any, fileInfo: FileInfo) {
    const formData = this.buildBlob(video, fileInfo);

    if (formData.has('file')) {
      return this.http.post('questions/upload/video', formData);
    } else {
      return of('form data does not have all components needed');
    }
  }

  uploadMemo(image: any, fileInfo: FileInfo) {
    const formData = this.buildBlob(image, fileInfo);

    if (formData.has('file')) {
      return this.http.post('questions/upload/memo', formData);
    } else {
      return of('form data does not have all components needed');
    }
  }

  uploadImage(image: any, fileInfo: FileInfo) {
    const formData = this.buildBlob(image, fileInfo);
    if (formData.has('file')) {
      return this.http.post('questions/upload/image', formData);
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

  getByPaperId(paperId: string): Observable<{ questions: Question[], userQuestions: UserQuestion[] }> {
    const url = `${this.url}/byPaperId/${paperId}`;
    return this.http.get<{ questions: Question[], userQuestions: UserQuestion[] }>(url, { params: { withImages: 'true' }});
  }

  getMultipleByIds(questionIds: number[]): Observable<{ questions: Question[], userQuestions: UserQuestion[] }> {
    const url = `${this.url}/multiple`;

    return this.http.post<{ questions: Question[], userQuestions: UserQuestion[] }>(url, { questionIds }, { params: { withImages: 'true'}});
  }
  
  getVideo(questionId: number, videoNumber: number): Observable<ResourceUrl> {
    const url = `${this.url}/${questionId}/video/${videoNumber}`;
    return this.http.get<ResourceUrl>(url);
  }

  getMemo(questionId: number): Observable<ResourceUrl> {
    const url = `${this.url}/${questionId}/memo`;
    return this.http.get<ResourceUrl>(url);
  }

  getImage(questionId: number): Observable<ResourceUrl> {
    const url = `${this.url}/${questionId}/image`;
    return this.http.get<ResourceUrl>(url);
  }

  getByCode(questionCode: string): Observable<Question> {
    const url = `${this.url}/byCode/${questionCode}`;
    return this.http.get<Question>(url);
  }

  /**
   * Updates the status of a paper for a user
   *
   * @param questionId The question id
   * @param checked The new Status of the paper
   * @param mode DEFAULT 1 <br/>Mode 1 sets memo mode, <br/>Mode 2 sets exam mode
   * */
  updateCompleteStatus(questionId: number, checked: boolean, mode: 1 | 2): Observable<any> {
    const url = `${this.url}/${questionId}/completeStatus`;
    return this.http.patch<any>(url, { completed: checked, mode });
  }

  addMemoViews(questionId: number, memoViews: number): Observable<any> {
    const url = `${this.url}/${questionId}/addMemoViews`;
    return this.http.patch<any>(url, { memoViews });
  }

  getCompleteStatus(questionId: number): Observable<UserQuestion> {
    const url = `${this.url}/${questionId}/completeStatus`;
    return this.http.get<any>(url);
  }

  addVideoViews(view: View, question: Question): Observable<any> {
    if(!question.id) {
      return null;
    }
    let url = `${ this.url}/${question.id}/addVideoView`;
    return this.http.patch<any>(url, {isOffline: view.isOffline, videoViews: view.viewCount});
  }
}
