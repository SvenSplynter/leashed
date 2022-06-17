export interface IProduct {
    id: number;
    name: string;
    publicName: string;
    productType: string;
    productTypeId: number;
    length: number;
    material: string;
    materialId: number;
    color: string;
    size: number;
    finishing: string;
    finishMaterial1: string;
    finishMaterial1Id: number;
    finishMaterial2: string;
    finishMaterial2Id: number;
    finishMaterial3: string;
    finishMaterial3Id: number;
    hook1: string;
    hook1Id: number;
    hook2: string;
    hook2Id: number;
    oRing1: string;
    oRing1Id: number;
    oRing2: string;
    oRing2Id: number;
    stopBar: string;
    stopBarId: number;
    keychain: string;
    keychainId: number;
    endCaps: string;
    endCapsId: number;
    price: number;
    inStock: number;
    description: string;
    lastUpdated: string;
    pictureUrl: string;
    photos: IPhoto[];
}

export interface IPhoto {
    id: number;
    pictureUrl: string;
    fileName: string;
    isMain: boolean;
}

export interface IProductToCreate {
    name: string;
    publicName: string;
    productTypeId: number;
    length: number;
    materialId: number;
    finishing: string;
    finishMaterial1Id: number;
    finishMaterial2Id: number;
    finishMaterial3Id: number;
    hook1Id: number;
    hook2Id: number;
    oRing1Id: number;
    oRing2Id: number;
    stopBarId: number;
    keychainId: number;
    endCapsId: number;
    price: number;
    inStock: number;
    description: string;
    lastUpdated: string;
    pictureUrl: string;
}

export class ProductFormValues implements IProductToCreate {
    name = '';
    publicName = '';
    productTypeId: number;
    length = 0;
    materialId: number;
    finishing = '';
    finishMaterial1Id: number;
    finishMaterial2Id: number;
    finishMaterial3Id: number;
    hook1Id: number;
    hook2Id: number;
    oRing1Id: number;
    oRing2Id: number;
    stopBarId: number;
    keychainId: number;
    endCapsId: number;
    price = 0;
    inStock = 0;
    description = '';
    pictureUrl = '';
    lastUpdated = '';

    constructor(init?: ProductFormValues) {
        Object.assign(this, init);
    }
}