
export type ExtractByType<T> = Extract<KeysOfType<T, string | number | Date | boolean | JSON>, string>;
export type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer K>
    ? ReadonlyArray<DeepPartial<K>>
    : DeepPartial<T[P]>
};

export type SortQuery<T> = [Extract<keyof T, string>, 'asc' | 'desc' | ''][];
export interface SearchQuery<T> {
    table?: string;
    columns: ExtractByType<T>[];
    text: string;
}
export interface FindAndCountAllRequest<T> {
    query?: {
        archived?: boolean,
        page?: number;
        pageSize?: number;
        sort?: SortQuery<T>;
        sortColumn?: string;
        sortDirection?: 'asc' | 'desc';
        search?: SearchQuery<T>;
        attributes?: ExtractByType<T>[];
        where?: DeepPartial<T> | { [field: string]: object };
    };
}

export interface FindCustomQuery<T> {
    query?: T
}

export interface FindAndCountAllResponse<T> {
    rows: T[],
    count: number
}

export interface FindByIdRequest {
    params: ByIdRequest['params']
    query?: { archived?: boolean };
}

export interface FindByParamRequest<T> {
    params: T
}

export interface FindByIdResponse<T> {
    id?: number;
}

export interface CreateRequest<T> {
    body: T;
}

export interface PutRequest<T> {
    params: ByIdRequest['params']
    body: T;
}

export interface PutResponse {
    id?: number;
}

export interface PatchRequest<T> {
    params: ByIdRequest['params']
    body: Partial<T>;
}

export interface ByIdRequest { params: { id: number } }

export interface OkResponse {
    id?: number;
}
