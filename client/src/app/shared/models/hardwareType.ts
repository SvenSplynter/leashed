export interface IHardwareType {
    id: number;
    name: string;
    description: string;
}

export interface IHardwareTypeToCreate {
    name: string;
    description: string;
}

export class HardwareTypeFormValues implements IHardwareTypeToCreate {
    name = '';
    description = '';
}