import { IStockMaterial } from "./stockMaterial";

export interface IStockMaterialPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IStockMaterial[];
}