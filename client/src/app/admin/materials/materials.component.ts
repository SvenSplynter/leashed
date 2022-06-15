import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IColor } from 'src/app/shared/models/color';
import { IMaterial } from 'src/app/shared/models/material';
import { MaterialParams } from 'src/app/shared/models/materialParams';
import { MaterialService } from './material.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MaterialsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  materials: IMaterial[];
  materialParams = new MaterialParams();
  color: IColor;

  columnsToDisplay: string[] = ['name', 'materialType', 'thickness', 'mainColor', 'color', 'pictureUrl', 'pricePerMeter', 'edit'];
  dataSource: MatTableDataSource<IMaterial> = new MatTableDataSource<IMaterial>();
  expandedElement: IMaterial | null;


  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.getMaterials();
  }

  getMaterials() {
    this.materialService.getMaterials(this.materialParams).subscribe(response => {
      this.materials = response.data;
      this.dataSource = new MatTableDataSource<IMaterial>(this.materials);
      if(this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }

      if(this.matSort) {
        this.dataSource.sort = this.matSort;
      }
    }, error => {
      console.log(error);
    });
  }

  filterMaterials(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
