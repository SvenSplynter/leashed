import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPagination } from 'src/app/models/pagination';
import { IProduct, ProductFormValues } from 'src/app/models/product';
import { ProductParams } from 'src/app/models/productParams';
import { IProductType } from 'src/app/models/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getProducts(productParams: ProductParams) {
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

  getProductTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/producttypes');
  }

  getProductType(productTypeId: string) {
    return this.http.get<IProductType>(this.baseUrl + 'products/producttypes/' + productTypeId);
  }

  updateProduct(productId: number, product: ProductFormValues) {
    console.log(product);
    return this.http.put(this.baseUrl + 'products/' + productId, product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(this.baseUrl + 'products/' + productId);
  }

  addProduct(product: ProductFormValues) {
    return this.http.post(this.baseUrl + 'products', product);
  }

  uploadImage(file: File, id: number) {
    const formData = new FormData();
    formData.append('photo', file, 'image.png');
    return this.http.put(this.baseUrl + 'products/' + id + '/photo', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteProductPhoto(photoId: number, productId: number){
    return this.http.delete(this.baseUrl + 'products/' + productId + '/photo/' + photoId);
  }

  setMainPhoto(photoId: number, productId: number) {
    return this.http.post(this.baseUrl + 'products/' + productId + '/photo/' + photoId, {});
  }
}
