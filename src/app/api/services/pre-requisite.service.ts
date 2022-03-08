import { Injectable } from '@angular/core';
import { CrudApiService } from './base/crud-api-service';
import { PreRequisite } from '@models/entities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PreRequisiteService extends CrudApiService<PreRequisite> {
  constructor(public http: HttpClient) {
    super(http, 'pre-requisites');
  }
}
