import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  products: IProduct[];
  productParams = new ProductParams();
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  columnsToDisplay: string[] = ['name', 'productType', 'length', 'material', 'finishing', 'finishMaterial1', 'finishMaterial2', 'finishMaterial3', 'hook1', 'hook2', 'oRing1', 'oRing2', 'stopBar', 'keychain', 'endCaps', 'price', 'inStock', 'pictureUrl', 'lastUpdated'];
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
      if(this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }

      if(this.matSort) {
        this.dataSource.sort = this.matSort;
      }
      console.log(this.products);
    }, error => {
      console.log(error);
    });
  }

  filterProducts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

}
