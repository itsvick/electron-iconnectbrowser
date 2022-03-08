import { HttpParams } from '@angular/common/http';

export interface HttpParamOptions {
    params?: HttpParams;
    removeNull?: boolean;
}

export class BaseApiService {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    toHttpParams(query?: { [key: string]: any }, options?: HttpParamOptions): HttpParams {
        options = options || {};
        let target: HttpParams = options.params || new HttpParams();
        if (query) {
            Object.keys(query).forEach((key: string) => {
                let value: any = query[key];
                if (value === '' || value === undefined || (options.removeNull && value === null)) {
                    return;
                }
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                } else {
                    value = value.toString();
                }
                target = target.append(key, value);
            });
        }
        return target;
    }
}

