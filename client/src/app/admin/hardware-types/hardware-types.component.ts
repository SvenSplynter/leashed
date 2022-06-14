import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHardwareType } from 'src/app/models/hardwareType';
import { HardwareService } from '../hardwares/hardware.service';

@Component({
  selector: 'app-hardware-types',
  templateUrl: './hardware-types.component.html',
  styleUrls: ['./hardware-types.component.scss']
})
export class HardwareTypesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  hardwareTypes: IHardwareType[] = [];

  displayedColumns: string[] = ['name', 'description', 'edit'];
  dataSource: MatTableDataSource<IHardwareType> = new MatTableDataSource<IHardwareType>();

  constructor(private hardwareService: HardwareService) { }

  ngOnInit(): void {
    this.getHardwareTypes();
  }

  getHardwareTypes() {
    this.hardwareService.getHardwareTypes().subscribe(async (response) => {
      this.hardwareTypes = response;
      this.dataSource = new MatTableDataSource<IHardwareType>(this.hardwareTypes);
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

  filterHardwareTypes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

}
