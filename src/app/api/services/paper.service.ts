import { Injectable } from '@angular/core';
import { Paper, UserPaper } from '@models/entities';
import { FindAndCountAllRequest } from '@models/routes/base-route.models';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PaginatedResult } from '@shared/models/pagination';
import { FileInfo } from '@shared/models/file-info';
import { PdfUrl } from '@api/models/paper.model';
import { ResourceUrl } from '@api/models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class PaperService extends CrudApiService<Paper> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'papers');
  }

  // CRUD
  create(model: Paper): Observable<Paper> {
    return super.createAndReturn(model);
  }

  getById(id: number): Observable<Paper> {
    return super.getById(id);
  }

  update(id: number, model: Paper): Observable<Paper> {
    return super.updateAndReturn(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<Paper>['query']): Observable<PaginatedResult<Paper>> {
    return super.findAndCountAll(options);
  }

  getAll(): Observable<Paper[]> {
    return super.findAll();
  }

  getMyPapers(gradeId: number, subjectId: number) {
    return this.http.get<UserPaper[]>(`${this.url}/me?gradeId=${gradeId}&subjectId=${subjectId}`);
  }

  changeLanguage(paperId: number, languageId: number): Observable<Paper> {
    return this.http.get<Paper>(`${this.url}/${paperId}/by-language/${languageId}`);
  }

  getPdfUrl(paperId: number): Observable<PdfUrl> {
    return this.http.get<PdfUrl>(`${this.url}/${paperId}/file`);
  }

  getThumbnailUrl(paperId: number): Observable<ResourceUrl> {
    return this.http.get<ResourceUrl>(`${this.url}/${paperId}/thumbnail`);
  }

  uploadPdf(pdf: any, fileInfo: FileInfo) {
    const formData = this.buildBlob(pdf, fileInfo);

    if (formData.has('file')) {
      return this.http.post('papers/upload/pdf', formData);
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
