import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../admin/products/product.service';
import { IProduct } from '../shared/models/product';
import { ProductParamsForShop } from '../shared/models/productParams';
import { IProductType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef; 
  title = 'Leashed';
  products: IProduct[];
  productParams = new ProductParamsForShop();
  productTypes: IProductType[];
  sizes = [];
  totalCount: number;
  sortOptions = [
    {name: 'Alfabetisch', value: 'name'},
    {name: 'Prijs: Laag - hoog', value: 'priceAsc'},
    {name: 'Prijs: Hoog - laag', value: 'priceDesc'}
  ];


  constructor(private productService: ProductService) {  }

  ngOnInit(): void {
    this.getProductTypes();
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProducts(this.productParams)
      .subscribe(
        (response) => {
          this.products = response.data;
          this.productParams.pageNumber = response.pageIndex;
          this.productParams.pageSize = response.pageSize;
          this.totalCount = response.count;
          this.products.forEach(product => {
            this.sizes.push(product.size);
            this.sizes = [0, ...this.sizes];
          });
          this.sizes = this.sizes.filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private getProductTypes() {
    this.productService.getProductTypes().subscribe(async (response) => {
      this.productTypes = [{id: 0, name: 'Alle', abbreviation: 'ALL'}, ...response];
    }, error => {
      console.log(error);
    }
    );
  }

  onTypeSelected(typeId: number) {
    this.productParams.typeId = typeId;
    this.productParams.pageNumber = 1;
    this.getProducts();
  }

  onSizeSelected(size: number) {
    this.productParams.size = size;
    this.productParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.productParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if(this.productParams.pageNumber !== event) {
      this.productParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.productParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.productParams = new ProductParamsForShop();
    this.getProducts();
  }
}
