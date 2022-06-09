export class MaterialParams {
    materialTypeId: number = 0;
    colorId: number = 0;
    thickness: number = 0;
    sort = 'name';
    pageNumber = 1;
    pageSize = 1000;
    search: string;
}

export class FinishMaterialParams {
    materialTypeId: number = 0;
    colorId: number = 0;
    thickness = 2;
    sort = 'name';
    pageNumber = 1;
    pageSize = 1000;
    search: string;
}

export class DefaultMaterialParams {
    materialTypeId: number = 1;
    colorId: number = 0;
    thickness = 0;
    sort = 'name';
    pageNumber = 1;
    pageSize = 1000;
    search: string;
}