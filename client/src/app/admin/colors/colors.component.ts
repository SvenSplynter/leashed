import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IColor } from 'src/app/models/color';
import { MaterialService } from '../materials/material.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ColorsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  colors: IColor[] = [];

  columnsToDisplay: string[] = ['name', 'mainColor', 'pictureUrl', 'edit'];
  dataSource: MatTableDataSource<IColor> = new MatTableDataSource<IColor>();

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.materialService.getColors().subscribe(async (response) => {
      this.colors = response;
      this.dataSource = new MatTableDataSource<IColor>(this.colors);
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

  filterColors(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
