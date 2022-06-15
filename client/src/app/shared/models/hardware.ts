export interface IHardware {
    id: number;
    name: string;
    hardwareType: string;
    hardwareTypeId: number;
    size: number;
    hardwareMaterial: string;
    hardwareMaterialId: number;
    hardwareColor: string;
    hardwareColorId: number;
    inStock: number;
    ordered: number;
    price: number;
}

export interface IHardwareToCreate {
    name: string;
    hardwareTypeId: number;
    size: number;
    hardwareMaterialId: number;
    hardwareColorId: number;
    inStock: number;
    ordered: number;
    price: number;
}

export class HardwareFormValues implements IHardwareToCreate {
    name: string;
    hardwareTypeId: number;
    size = 0;
    hardwareMaterialId: number;
    hardwareColorId: number;
    inStock = 0;
    ordered = 0;
    price = 0;

    constructor(init?: HardwareFormValues) {
        Object.assign(this, init);
    }
}