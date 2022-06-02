import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IStockMaterial } from 'src/app/models/stockMaterial';
import { StockMaterialParams } from 'src/app/models/stockMaterialParams';
import { MaterialService } from '../materials/material.service';

@Component({
  selector: 'app-stock-materials',
  templateUrl: './stock-materials.component.html',
  styleUrls: ['./stock-materials.component.scss']
})
export class StockMaterialsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  stockMaterials: IStockMaterial[];
  stockMaterialParams = new StockMaterialParams();

  columnsToDisplay: string[] = ['id', 'name', 'material', 'color', 'size', 'meterInStock'];
  dataSource: MatTableDataSource<IStockMaterial> = new MatTableDataSource<IStockMaterial>();


  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.getStockMaterials();
  }

  getStockMaterials() {
    this.materialService.getStockMaterials(this.stockMaterialParams).subscribe(response => {
      console.log(response);
      this.stockMaterials = response.data;
      this.dataSource = new MatTableDataSource<IStockMaterial>(this.stockMaterials);
      if(this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }

      if(this.matSort) {
        this.dataSource.sort = this.matSort;
      }
      console.log(this.stockMaterials);
    }, error => {
      console.log(error);
    });
  }

  filterStockMaterials(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }
}
