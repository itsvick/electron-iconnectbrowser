import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApiService } from './base/crud-api-service';
import { UserType } from '@models/entities';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService extends CrudApiService<UserType> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'user-types');
  }

  getAll(): Observable<UserType[]> {
    return super.findAll();
  }
}
