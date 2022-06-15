import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHardware } from 'src/app/shared/models/hardware';
import { HardwareParams } from 'src/app/shared/models/hardwareParams';
import { HardwareService } from './hardware.service';

@Component({
  selector: 'app-hardwares',
  templateUrl: './hardwares.component.html',
  styleUrls: ['./hardwares.component.scss']
})
export class HardwaresComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  hardwares: IHardware[];
  hardwareParams = new HardwareParams();

  columnsToDisplay: string[] = ['name', 'hardwareType', 'size', 'hardwareMaterial', 'hardwareColor', 'inStock', 'ordered', 'price', 'edit'];
  dataSource: MatTableDataSource<IHardware> = new MatTableDataSource<IHardware>();


  constructor(private hardwareService: HardwareService) { }

  ngOnInit(): void {
    this.getHardwares();
  }

  getHardwares() {
    this.hardwareService.getHardwares(this.hardwareParams).subscribe(response => {
      this.hardwares = response.data;
      this.dataSource = new MatTableDataSource<IHardware>(this.hardwares);
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

  filterHardwares(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
