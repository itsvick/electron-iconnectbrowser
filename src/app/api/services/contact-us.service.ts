import { Injectable } from '@angular/core';
import { CrudApiService } from './base/crud-api-service';
import { HttpClient } from '@angular/common/http';
import { ContactUs } from '@models/entities';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService extends CrudApiService<ContactUs> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, 'contact-us');
  }
}
