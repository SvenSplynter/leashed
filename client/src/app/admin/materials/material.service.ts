import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ColorFormValues, IColor } from 'src/app/shared/models/color';
import { IMaterial, MaterialFormValues } from 'src/app/shared/models/material';
import { IMaterialPagination } from 'src/app/shared/models/materialPagination';
import { MaterialParams } from 'src/app/shared/models/materialParams';
import { IMaterialType, MaterialTypeFormValues } from 'src/app/shared/models/materialType';
import { IStockMaterial, StockMaterialFormValues } from 'src/app/shared/models/stockMaterial';
import { IStockMaterialPagination } from 'src/app/shared/models/stockMaterialPagination';
import { StockMaterialParams } from 'src/app/shared/models/stockMaterialParams';

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

    if(materialParams.thickness !== 0) {
      params = params.append('thickness', materialParams.thickness.toString());
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
  
  getStockMaterial(id: string): Observable<IStockMaterial> {
    return this.http.get<IStockMaterial>(this.baseUrl + 'products/stockmaterials/' + id);
  }


  getMaterialTypes(): Observable<IMaterialType[]> {
    return this.http.get<IMaterialType[]>(this.baseUrl + 'products/materialtypes');
  }

  getMaterialType(materialTypeId: string) {
    return this.http.get<IMaterialType>(this.baseUrl + 'products/materialtypes/' + materialTypeId);
  }

  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>(this.baseUrl + 'products/colors');
  }

  getColor(id: string) {
    return this.http.get<IColor>(this.baseUrl + 'products/colors/' + id);
  }

  updateColor(colorId: number, color: ColorFormValues) {
    return this.http.put(this.baseUrl + 'products/colors/' + colorId, color);
  }

  deleteColor(colorId: number) {
    return this.http.delete(this.baseUrl + 'products/colors/' + colorId);
  }

  addColor(color: ColorFormValues) {
    return this.http.post(this.baseUrl + 'products/colors', color);
  }

  uploadImage(file: File, id: number) {
    const formData = new FormData();
    formData.append('photo', file, 'image.png');
    return this.http.put(this.baseUrl + 'products/colors/' + id + '/photo', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteColorPhoto(photoId: number, colorId: number){
    return this.http.delete(this.baseUrl + 'products/colors/' + colorId + '/photo/' + photoId);
  }

  setMainPhoto(photoId: number, colorId: number) {
    return this.http.post(this.baseUrl + 'products/colors/' + colorId + '/photo/' + photoId, {});
  }

  updateMaterial(materialId: number, material: MaterialFormValues) {
    return this.http.put(this.baseUrl + 'products/materials/' + materialId, material);
  }

  deleteMaterial(materialId: number) {
    return this.http.delete(this.baseUrl + 'products/materials/' + materialId);
  }

  addMaterial(material: MaterialFormValues) {
    return this.http.post(this.baseUrl + 'products/materials', material);
  }

  updateStockMaterial(stockmaterialId: number, stockmaterial: StockMaterialFormValues) {
    return this.http.put(this.baseUrl + 'products/stockmaterials/' + stockmaterialId, stockmaterial);
  }

  deleteStockMaterial(stockmaterialId: number) {
    return this.http.delete(this.baseUrl + 'products/stockmaterials/' + stockmaterialId);
  }

  addStockMaterial(stockmaterial: StockMaterialFormValues) {
    return this.http.post(this.baseUrl + 'products/stockmaterials', stockmaterial);
  }

  updateMaterialType(materialTypeId: number, materialType: MaterialTypeFormValues) {
    return this.http.put(this.baseUrl + 'products/materialtypes/' + materialTypeId, materialType);
  }

  deleteMaterialType(materialTypeId: number) {
    return this.http.delete(this.baseUrl + 'products/materialtypes/' + materialTypeId);
  }

  addMaterialType(materialType: MaterialTypeFormValues) {
    return this.http.post(this.baseUrl + 'products/materialtypes', materialType);
  }
}
