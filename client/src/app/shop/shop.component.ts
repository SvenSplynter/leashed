import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from '../models/pagination';
import { IProduct } from '../models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  title = 'Leashed';
  products: IProduct[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products').subscribe(
      (response: IPagination) => {
        this.products = response.data;
        console.log(this.products);
      }, error => {
        console.log(error);
      }
    );
  }

}
