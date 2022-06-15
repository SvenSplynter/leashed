export interface IHardwareColor {
    id: number;
    name: string;
    description: string;
}

export interface IHardwareColorToCreate {
    name: string;
    description: string;
}

export class HardwareColorFormValues implements IHardwareColorToCreate {
    name = '';
    description = '';
}