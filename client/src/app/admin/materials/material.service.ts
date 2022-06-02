import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IColor } from 'src/app/models/color';
import { IMaterial } from 'src/app/models/material';
import { IMaterialPagination } from 'src/app/models/materialPagination';
import { MaterialParams } from 'src/app/models/materialParams';
import { IMaterialType } from 'src/app/models/materialType';
import { IStockMaterialPagination } from 'src/app/models/stockMaterialPagination';
import { StockMaterialParams } from 'src/app/models/stockMaterialParams';
import { UpdateMaterialRequest } from 'src/app/models/update-material-request';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getMaterials(materialParams: MaterialParams) {
    let params = new HttpParams();

    if(materialParams.materialTypeId !== 0) {
      params = params.append('materialTypeId', materialParams.materialTypeId.toString());
    }

    if(materialParams.colorId !== 0) {
      params = params.append('colorId', materialParams.colorId.toString());
    }

    if(materialParams.search) {
      params = params.append('search', materialParams.search);

    }

    params = params.append('sort', materialParams.sort);
    params = params.append('pageIndex', materialParams.pageNumber.toString());
    params = params.append('pageSize', materialParams.pageSize.toString());


    return this.http.get<IMaterialPagination>(this.baseUrl + 'products/materials', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getMaterial(id: string): Observable<IMaterial> {
    return this.http.get<IMaterial>(this.baseUrl + 'products/materials/' + id);
  }

  getStockMaterials(stockMaterialParams: StockMaterialParams) {
    let params = new HttpParams();

    if(stockMaterialParams.thickness !== 0) {
      params = params.append('thickness', stockMaterialParams.thickness.toString());
    }

    if(stockMaterialParams.colorId !== 0) {
      params = params.append('colorId', stockMaterialParams.colorId.toString());
    }

    if(stockMaterialParams.search) {
      params = params.append('search', stockMaterialParams.search);

    }

    params = params.append('sort', stockMaterialParams.sort);
    params = params.append('pageIndex', stockMaterialParams.pageNumber.toString());
    params = params.append('pageSize', stockMaterialParams.pageSize.toString());


    return this.http.get<IStockMaterialPagination>(this.baseUrl + 'products/stockmaterials', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getMaterialTypes(): Observable<IMaterialType[]> {
    return this.http.get<IMaterialType[]>(this.baseUrl + 'products/materialtypes');
  }

  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>(this.baseUrl + 'products/colors');
  }

  updateMaterial(materialId: number, materialRequest: IMaterial): Observable<IMaterial> {
    const updateMaterialRequest: UpdateMaterialRequest = {
      name: materialRequest.name,
      materialTypeId: materialRequest.materialTypeId,
      thickness: materialRequest.thickness,
      colorId: materialRequest.colorId,
      pricePerMeter: materialRequest.pricePerMeter
    }

    return this.http.put<IMaterial>(this.baseUrl + 'products/materials/' + materialId, updateMaterialRequest);
  }
}
