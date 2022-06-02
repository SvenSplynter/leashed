import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IHardwareColor } from 'src/app/models/hardwareColor';
import { IHardwareMaterial } from 'src/app/models/hardwareMaterial';
import { IHardwarePagination } from 'src/app/models/hardwarePagination';
import { HardwareParams } from 'src/app/models/hardwareParams';
import { IHardwareType } from 'src/app/models/hardwareType';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getHardwares(hardwareParams: HardwareParams) {
    let params = new HttpParams();

    if(hardwareParams.hardwareTypeId !== 0) {
      params = params.append('hardwareTypeId', hardwareParams.hardwareTypeId.toString());
    }

    if(hardwareParams.hardwareMaterialId !== 0) {
      params = params.append('hardwareMaterialId', hardwareParams.hardwareMaterialId.toString());
    }

    if(hardwareParams.hardwareColorId !== 0) {
      params = params.append('hardwareColorId', hardwareParams.hardwareColorId.toString());
    }


    if(hardwareParams.search) {
      params = params.append('search', hardwareParams.search);

    }

    params = params.append('sort', hardwareParams.sort);
    params = params.append('pageIndex', hardwareParams.pageNumber.toString());
    params = params.append('pageSize', hardwareParams.pageSize.toString());


    return this.http.get<IHardwarePagination>(this.baseUrl + 'products/hardwares', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  
  getHardwareTypes(): Observable<IHardwareType[]> {
    return this.http.get<IHardwareType[]>(this.baseUrl + 'products/hardwaretypes');
  }
  getHardwareMaterials(): Observable<IHardwareMaterial[]> {
    return this.http.get<IHardwareMaterial[]>(this.baseUrl + 'products/hardwarematerials');
  }
  getHardwareColors(): Observable<IHardwareColor[]> {
    return this.http.get<IHardwareColor[]>(this.baseUrl + 'products/hardwarecolors');
  }

}
