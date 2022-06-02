import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMaterial } from 'src/app/models/material';
import { MaterialParams } from 'src/app/models/materialParams';
import { MaterialService } from './material.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  materials: IMaterial[];
  materialParams = new MaterialParams();

  columnsToDisplay: string[] = ['id', 'name', 'materialType', 'thickness', 'color', 'pricePerMeter', 'edit'];
  dataSource: MatTableDataSource<IMaterial> = new MatTableDataSource<IMaterial>();


  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.getMaterials();
  }

  getMaterials() {
    this.materialService.getMaterials(this.materialParams).subscribe(response => {
      console.log(response);
      this.materials = response.data;
      this.dataSource = new MatTableDataSource<IMaterial>(this.materials);
      if(this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }

      if(this.matSort) {
        this.dataSource.sort = this.matSort;
      }
      console.log(this.materials);
    }, error => {
      console.log(error);
    });
  }

  filterMaterials(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

}
