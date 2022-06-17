import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/admin/products/product.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService) {
    bcService.set('@productDetails', ' ');
   }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProduct(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.publicName);
    }, error => {
      console.log(error);
    });
  }

}
