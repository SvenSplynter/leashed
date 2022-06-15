export interface IMaterialType {
    id: number;
    name: string;
    description: string;
}

export interface IMaterialTypeToCreate {
    name: string;
    description: string;
}

export class MaterialTypeFormValues implements IMaterialTypeToCreate {
    name = '';
    description = '';
}