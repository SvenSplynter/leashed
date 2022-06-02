import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMaterialType } from 'src/app/models/materialType';
import { MaterialService } from '../materials/material.service';

@Component({
  selector: 'app-material-types',
  templateUrl: './material-types.component.html',
  styleUrls: ['./material-types.component.scss']
})
export class MaterialTypesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  materialTypes: IMaterialType[] = [];

  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource: MatTableDataSource<IMaterialType> = new MatTableDataSource<IMaterialType>();

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.getMaterialTypes();
  }

  getMaterialTypes() {
    this.materialService.getMaterialTypes().subscribe(async (response) => {
      this.materialTypes = response;
      console.log(this.materialTypes);
      this.dataSource = new MatTableDataSource<IMaterialType>(this.materialTypes);
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

  filterMaterialTypes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

}
