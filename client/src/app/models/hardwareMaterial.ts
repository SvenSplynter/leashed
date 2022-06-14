export interface IHardwareMaterial {
    id: number;
    name: string;
    description: string;
}

export interface IHardwareMaterialToCreate {
    name: string;
    description: string;
}

export class HardwareMaterialFormValues implements IHardwareMaterialToCreate {
    name = '';
    description = '';
}