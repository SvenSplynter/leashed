import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { ProductParamsForShop } from '../shared/models/productParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getProducts(productParams: ProductParamsForShop) {
    let params = new HttpParams();

    if(productParams.typeId !== 0) {
      params = params.append('typeId', productParams.typeId.toString());
    }

    if(productParams.size !== 0) {
      params = params.append('size', productParams.size.toString());
    }

    if(productParams.search) {
      params = params.append('search', productParams.search);

    }

    params = params.append('sort', productParams.sort);
    params = params.append('pageIndex', productParams.pageNumber.toString());
    params = params.append('pageSize', productParams.pageSize.toString());


    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getProduct(id: string) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

}
