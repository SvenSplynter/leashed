import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProductType } from 'src/app/models/productType';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss']
})
export class ProductTypesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  productTypes: IProductType[] = [];

  displayedColumns: string[] = ['id', 'name', 'abbreviation'];
  dataSource: MatTableDataSource<IProductType> = new MatTableDataSource<IProductType>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductTypes();
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe((response) => {
      this.productTypes = response;
      console.log(this.productTypes);
      this.dataSource = new MatTableDataSource<IProductType>(this.productTypes);
      this.dataSource.paginator = this.matPaginator;
    }, error => {
      console.log(error);
    }
    )
  }

}
