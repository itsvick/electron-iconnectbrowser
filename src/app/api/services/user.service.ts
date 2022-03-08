import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiService } from './base/crud-api-service';
import { User, UserPaper, UserLesson, Metric, Address, InvoiceHistoryItem, UserPublication } from '@models/entities';
import { PaginatedResult } from 'app/shared/models/pagination';
import { FindAndCountAllRequest, OkResponse } from '@models/routes/base-route.models';
import { FilterOptions } from '@models/entities/school';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudApiService<User> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  // CRUD
  create(model: User): Observable<OkResponse> {
    return super.create(model);
  }

  getById(id: number): Observable<User> {
    return super.getById(id);
  }

  update(id: number, model: User): Observable<OkResponse> {
    return super.update(id, model);
  }

  delete(id: number): any {
    return super.delete(id);
  }

  // Custom
  getAllPaginated(options?: FindAndCountAllRequest<User>['query']): Observable<PaginatedResult<User>> {
    return super.findAndCountAll(options);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${ this.url }/me`);
  }

  findMonitor(email: string, phoneNumber?: string): Observable<User> {
    let params = new HttpParams();
    if (email) {
      params = params.append('email', email.toString());
    }
    if (phoneNumber) {
      params = params.append('phoneNumber', phoneNumber.toString());
    }
    return this.http.get<User>(`${ this.url }/monitor`, { params });
  }

  getMetrics(options: { gradeId: number; subjectId: number; fromDate: string }) {
    const params = this.toHttpParams(options, { removeNull: true });
    return this.http.get<Array<Metric>>(`${ this.url }/metric`, { params });
  }

  /**
   * @param paperId The id of the paper to update
   * @param markAsCompleted the status of the paper
   * @param updateChildren Should the child questions also be marked as complete
   * @param mode Mode 1 sets memo mode <br/>Mode 2 sets exam mode <br/>Mode 3 completes both
   */
  updatePaper(paperId: number, markAsCompleted, mode: 1 | 2 | 3, updateChildren = false) {
    return this.http.put<UserPaper>(`${ this.url }/papers/${ paperId }`, {
      completed: markAsCompleted,
      updateChildren,
      mode
    });
  }

  updateLesson(lessonId: number, markAsCompleted) {
    return this.http.put<UserLesson>(`${ this.url }/lessons/${ lessonId }`, { completed: markAsCompleted });
  }

  setRedirectId(id: number, redirectId: number) {
    return this.http.put<User>(`${ this.url }/redirect/${ id }`, { redirectTypeId: redirectId });
  }

  getLessonStatus(id: number): Observable<UserLesson> {
    return this.http.get<UserLesson>(`${ this.url }/lessons/${ id }/status`);
  }

  updateAddress(userId: number, address: Address): Observable<Address> {
    return this.http.patch<Address>(`${ this.url }/${ userId }/address`, address);
  }

  getPaymentHistory(): Observable<InvoiceHistoryItem[]> {
    return this.http.get<InvoiceHistoryItem[]>(`${ this.url }/payment-history`);
  }

  getInvoicePdf(id: number): Observable<any> {
    return this.http.get(`${ this.url }/pdf/${ id }`, {
      responseType: 'blob'
    });
  }

  getChildren(): Observable<User[]> {
    return this.http.get<User[]>(`${ this.url }/children`);
  }

  setVerified(id: number, value: boolean) {
    return this.http.patch(`${ this.url }/${ id }/verify`, { value });
  }

  deactivateAndArchive(id: number) {
    return this.http.delete(`${ this.url }/${ id }/archive`);
  }

  updateShippingInformation(id: number, userPublication: Partial<UserPublication>) {
    return this.http.patch(`${ this.url }/${ id }/publication`, userPublication);
  }

  getStatsBySponsor(id?: number, filterOptions?: FilterOptions): Observable<Metric[]> {
    const params = this.toHttpParams({
      ...filterOptions,
      sponsorId: id
    });
    const url = `${ this.url }/metrics`;
    return this.httpClient.get<Metric[]>(url, { params });
  }

  getStatsBySchool(id?: number, filterOptions?: FilterOptions): Observable<Metric[]> {
    const params = this.toHttpParams({
      ...filterOptions,
    });
    const url = `${ this.url }/metrics/${ id }`;
    return this.httpClient.get<Metric[]>(url, { params });
  }
}
