export interface IMaterial {
    id: number;
    name: string;
    materialType: string;
    materialTypeId: number;
    thickness: number;
    color: string;
    colorId: number;
    pricePerMeter: number;
}

export interface IMaterialToCreate {
    materialTypeId: number;
    thickness: number;
    colorId: number;
    pricePerMeter: number;
}

export class MaterialFormValues implements IMaterialToCreate {
    materialTypeId: number;
    thickness = 0;
    colorId: number;
    pricePerMeter = 0;

    constructor(init?: MaterialFormValues) {
        Object.assign(this, init);
    }
}