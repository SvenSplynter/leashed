export interface IProductType {
    id: number;
    name: string;
    abbreviation: string;
    description: string;
}

export interface IProductTypeToCreate {
    name: string;
    abbreviation: string;
    description: string;
}

export class ProductTypeFormValues implements IProductTypeToCreate {
    name = '';
    abbreviation = '';
    description = '';
}