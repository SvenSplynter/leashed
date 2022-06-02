import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductType } from 'src/app/models/productType';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-view-product-type',
  templateUrl: './view-product-type.component.html',
  styleUrls: ['./view-product-type.component.scss']
})
export class ViewProductTypeComponent implements OnInit {
  productTypeId: string | null | undefined;
  productType: IProductType;

  constructor(private productService: ProductService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductType();
  }

  getProductType() {
    this.route.paramMap.subscribe(
      (params) => {
        this.productTypeId = params.get('id');
      }
    );
    if (this.productTypeId) {
      this.productService.getProductType(this.productTypeId).subscribe(
        (response) => {
          this.productType = response;
          console.log(this.productType);
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }
}
