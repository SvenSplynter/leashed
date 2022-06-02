import { IMaterial } from "./material";

export interface IMaterialPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IMaterial[];
}