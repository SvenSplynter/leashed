import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'src/app/models/product';
import { ProductParams } from 'src/app/models/productParams';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  productParams = new ProductParams();
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  columnsToDisplay: string[] = ['name', 'type', 'length', 'material', 'finish', 'finish1', 'finish2', 'finish3', 'hook1', 'hook2', 'oring1', 'oring2', 'stopbar', 'keychain', 'endcaps', 'price', 'instock', 'pictureUrl', 'lastUpdated'];
  dataSource: MatTableDataSource<IProduct> = new MatTableDataSource<IProduct>();
  expandedElement: IProduct | null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.productParams).subscribe(response => {
      console.log(response);
      this.products = response.data;
      this.productParams.pageNumber = response.pageIndex;
      this.productParams.pageSize = response.pageSize;
      this.totalCount = response.count;
      this.dataSource = new MatTableDataSource<IProduct>(this.products);
      console.log(this.products);
    }, error => {
      console.log(error);
    });
  }

}
