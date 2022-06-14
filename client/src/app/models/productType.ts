export interface IProductType {
    id: number;
    name: string;
    abbreviation: string;
}

export interface IProductTypeToCreate {
    name: string;
    abbreviation: string;
}

export class ProductTypeFormValues implements IProductTypeToCreate {
    name = '';
    abbreviation = '';
}