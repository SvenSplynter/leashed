import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HardwareFormValues, IHardware } from 'src/app/shared/models/hardware';
import { HardwareColorFormValues, IHardwareColor } from 'src/app/shared/models/hardwareColor';
import { HardwareMaterialFormValues, IHardwareMaterial } from 'src/app/shared/models/hardwareMaterial';
import { IHardwarePagination } from 'src/app/shared/models/hardwarePagination';
import { HardwareParams } from 'src/app/shared/models/hardwareParams';
import { HardwareTypeFormValues, IHardwareType } from 'src/app/shared/models/hardwareType';

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

  getHardware(id: string): Observable<IHardware> {
    return this.http.get<IHardware>(this.baseUrl + 'products/hardwares/' + id);
  }
  
  getHardwareTypes(): Observable<IHardwareType[]> {
    return this.http.get<IHardwareType[]>(this.baseUrl + 'products/hardwaretypes');
  }

  getHardwareType(hardwareTypeId: string) {
    return this.http.get<IHardwareType>(this.baseUrl + 'products/hardwaretypes/' + hardwareTypeId);
  }

  updateHardwareType(hardwareTypeId: number, hardwareType: HardwareTypeFormValues) {
    return this.http.put(this.baseUrl + 'products/hardwaretypes/' + hardwareTypeId, hardwareType);
  }

  deleteHardwareType(hardwareTypeId: number) {
    return this.http.delete(this.baseUrl + 'products/hardwaretypes/' + hardwareTypeId);
  }

  addHardwareType(hardwareType: HardwareTypeFormValues) {
    return this.http.post(this.baseUrl + 'products/hardwaretypes', hardwareType);
  }

  getHardwareMaterials(): Observable<IHardwareMaterial[]> {
    return this.http.get<IHardwareMaterial[]>(this.baseUrl + 'products/hardwarematerials');
  }

  getHardwareMaterial(hardwareMaterialId: string) {
    return this.http.get<IHardwareMaterial>(this.baseUrl + 'products/hardwarematerials/' + hardwareMaterialId);
  }

  updateHardwareMaterial(hardwareMaterialId: number, hardwareMaterial: HardwareMaterialFormValues) {
    return this.http.put(this.baseUrl + 'products/hardwarematerials/' + hardwareMaterialId, hardwareMaterial);
  }

  deleteHardwareMaterial(hardwareMaterialId: number) {
    return this.http.delete(this.baseUrl + 'products/hardwarematerials/' + hardwareMaterialId);
  }

  addHardwareMaterial(hardwareMaterial: HardwareMaterialFormValues) {
    return this.http.post(this.baseUrl + 'products/hardwarematerials', hardwareMaterial);
  }

  getHardwareColors(): Observable<IHardwareColor[]> {
    return this.http.get<IHardwareColor[]>(this.baseUrl + 'products/hardwarecolors');
  }

  getHardwareColor(hardwareColorId: string) {
    return this.http.get<IHardwareColor>(this.baseUrl + 'products/hardwarecolors/' + hardwareColorId);
  }

  updateHardwareColor(hardwareColorId: number, hardwareColor: HardwareColorFormValues) {
    return this.http.put(this.baseUrl + 'products/hardwarecolors/' + hardwareColorId, hardwareColor);
  }

  deleteHardwareColor(hardwareColorId: number) {
    return this.http.delete(this.baseUrl + 'products/hardwarecolors/' + hardwareColorId);
  }

  addHardwareColor(hardwareColor: HardwareColorFormValues) {
    return this.http.post(this.baseUrl + 'products/hardwarecolors', hardwareColor);
  }

  updateHardware(hardwareId: number, hardware: HardwareFormValues) {
    return this.http.put(this.baseUrl + 'products/hardwares/' + hardwareId, hardware);
  }

  deleteHardware(hardwareId: number) {
    return this.http.delete(this.baseUrl + 'products/hardwares/' + hardwareId);
  }

  addHardware(hardware: HardwareFormValues) {
    return this.http.post(this.baseUrl + 'products/hardwares', hardware);
  }

}
