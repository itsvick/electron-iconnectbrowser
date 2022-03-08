export class AutocompleteSearchOptions {
    maxListSize: number;
    searchOptions: {
        attributes: string[],
        page: number,
        pageSize: number,
        sortColumn: string,
        sortDirection: string,
        search: {
            columns: string[],
            text?: string,
            table: string,
        },
    };
    prefixKey?: string;
    mainKey: string;
    suffixKey?: string;

    constructor(
        maxListSize: number = 10,
        searchOptions = {
            attributes: ['id', 'name'],
            page: 1,
            pageSize: 1,
            sortColumn: 'name',
            sortDirection: 'asc',
            search: {
                columns: ['name'],
                text: null,
                table: 'no_table_assigned',
            }
        },
        prefixKey: string = null,
        mainKey: string = 'name',
        suffixKey: string = null
    ) {

    }
}