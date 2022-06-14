import { IPhoto } from "./product";

export interface IColor {
    id: number;
    name: string;
    mainColor: string;
    pictureUrl: string;
    photos: IPhoto[];
}

export interface IColorToCreate {
    name: string;
    mainColor: string;
    pictureUrl: string;
}

export class ColorFormValues implements IColorToCreate {
    name = '';
    mainColor = '';
    pictureUrl = '';

    constructor(init?: ColorFormValues) {
        Object.assign(this, init);
    }
}