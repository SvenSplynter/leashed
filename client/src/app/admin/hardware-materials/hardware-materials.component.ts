import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHardwareMaterial } from 'src/app/models/hardwareMaterial';
import { HardwareService } from '../hardwares/hardware.service';

@Component({
  selector: 'app-hardware-materials',
  templateUrl: './hardware-materials.component.html',
  styleUrls: ['./hardware-materials.component.scss']
})
export class HardwareMaterialsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  hardwareMaterials: IHardwareMaterial[] = [];

  displayedColumns: string[] = ['name', 'description', 'edit'];
  dataSource: MatTableDataSource<IHardwareMaterial> = new MatTableDataSource<IHardwareMaterial>();

  constructor(private hardwareService: HardwareService) { }

  ngOnInit(): void {
    this.getHardwareMaterials();
  }

  getHardwareMaterials() {
    this.hardwareService.getHardwareMaterials().subscribe(async (response) => {
      this.hardwareMaterials = response;
      this.dataSource = new MatTableDataSource<IHardwareMaterial>(this.hardwareMaterials);
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

  filterHardwareMaterials(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

}
