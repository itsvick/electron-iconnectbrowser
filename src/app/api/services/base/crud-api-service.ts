import { HttpClient } from '@angular/common/http';
import {
    FindAndCountAllRequest,
    FindAndCountAllResponse,
    FindByIdRequest,
    FindByIdResponse,
    CreateRequest,
    OkResponse,
    PutRequest
} from '@models/routes/base-route.models';
import { BaseApiService } from './base-api-service';

export class CrudApiService<T> extends BaseApiService {
    constructor(public http: HttpClient, url: string) {
        super(url);
    }

    findAndCountAll(query?: FindAndCountAllRequest<T>['query'], options?: any) {
        const params = this.toHttpParams(query || null);
        const url = this.url;
        return this.http.get<FindAndCountAllResponse<T>>(url, { params });
    }

    getById(id: FindByIdRequest['params']['id'], query?: FindByIdRequest['query'], options?: any) {
        const params = this.toHttpParams(query || null);
        const url = `${this.url}/${id}`;
        return this.http.get<T>(url, { params });
    }

    create(body: CreateRequest<T>['body'], options?: any) {
        const url = `${this.url}`;
        return this.http.post<OkResponse>(url, body);
    }

    createAndReturn(body: CreateRequest<T>['body'], options?: any) {
        const url = `${this.url}`;
        return this.http.post<T>(url, body);
    }

    update(id: PutRequest<T>['params']['id'], body: PutRequest<T>['body'], options?: any) {
        const url = `${this.url}/${id}`;
        return this.http.put<OkResponse>(url, body);
    }

    updateAndReturn(id: PutRequest<T>['params']['id'], body: PutRequest<T>['body'], options?: any) {
        const url = `${this.url}/${id}`;
        return this.http.put<T>(url, body);
    }

    delete(id: FindByIdRequest['params']['id'], options?: any) {
        const url = `${this.url}/${id}`;
        return this.http.delete<OkResponse>(url);
    }

    findAll() {
        const url = this.url;
        return this.http.get<T[]>(url);
    }

    findOrCreate(body) {
        const url = `${this.url}/findorcreate`;
        return this.http.post<T>(url, body);
    }
}
