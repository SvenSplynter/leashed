import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHardwareColor } from 'src/app/models/hardwareColor';
import { HardwareService } from '../hardwares/hardware.service';

@Component({
  selector: 'app-hardware-colors',
  templateUrl: './hardware-colors.component.html',
  styleUrls: ['./hardware-colors.component.scss']
})
export class HardwareColorsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  hardwareColors: IHardwareColor[] = [];

  displayedColumns: string[] = ['name', 'description', 'edit'];
  dataSource: MatTableDataSource<IHardwareColor> = new MatTableDataSource<IHardwareColor>();

  constructor(private hardwareService: HardwareService) { }

  ngOnInit(): void {
    this.getHardwareColors();
  }

  getHardwareColors() {
    this.hardwareService.getHardwareColors().subscribe(async (response) => {
      this.hardwareColors = response;
      this.dataSource = new MatTableDataSource<IHardwareColor>(this.hardwareColors);
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

  filterHardwareColors(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

}

