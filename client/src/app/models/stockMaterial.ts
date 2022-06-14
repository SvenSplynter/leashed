export interface IStockMaterial {
    id: number;
    name: string;
    materialType: string;
    materialTypeId: number;
    mainColor: string;
    color: string;
    pictureUrl: string;
    size: number;
    meterInStock: number;
}

export interface IStockMaterialToCreate {
    name: string;
    materialTypeId: number;
    size: number;
    meterInStock: number;
}

export class StockMaterialFormValues implements IStockMaterialToCreate {
    name: string;
    materialTypeId: number;
    size = 0;
    meterInStock = 0;

    constructor(init?: StockMaterialFormValues) {
        Object.assign(this, init);
    }
}

