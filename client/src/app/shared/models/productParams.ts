export class ProductParams {
    typeId: number = 0;
    size: number = 0;
    sort = 'name';
    pageNumber = 1;
    pageSize = 1000;
    search: string;
}

export class ProductParamsForShop {
    typeId: number = 0;
    size: number = 0;
    sort = 'name';
    pageNumber = 1;
    pageSize = 6;
    search: string;
}