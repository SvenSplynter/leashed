import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProductType } from 'src/app/shared/models/productType';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss']
})
export class ProductTypesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  productTypes: IProductType[] = [];

  displayedColumns: string[] = ['name', 'abbreviation', 'edit'];
  dataSource: MatTableDataSource<IProductType> = new MatTableDataSource<IProductType>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductTypes();
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe(async (response) => {
      this.productTypes = response;
      this.dataSource = new MatTableDataSource<IProductType>(this.productTypes);
      if(this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }

      if(this.matSort) {
        this.dataSource.sort = this.matSort;
      }
    }, error => {
      console.log(error);
    }
    )
  }

  filterProductTypes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

}
