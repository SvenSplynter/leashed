import { IHardware } from "./hardware";

export interface IHardwarePagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IHardware[];
}