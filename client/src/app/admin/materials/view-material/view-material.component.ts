import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IColor } from 'src/app/models/color';
import { IMaterial } from 'src/app/models/material';
import { IMaterialType } from 'src/app/models/materialType';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.scss']
})
export class ViewMaterialComponent implements OnInit {
  materialId: string | null | undefined;
  material: IMaterial;
  materialTypes: IMaterialType[];
  materialColors: IColor[];

  constructor(private materialService: MaterialService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMaterial();
    this.getMaterialTypes();
    this.getMaterialColors();
  }

  getMaterial() {
    this.route.paramMap.subscribe(
      (params) => {
        this.materialId = params.get('id');
      }
    );
    if (this.materialId) {
      this.materialService.getMaterial(this.materialId).subscribe(
        (response) => {
          this.material = response;
          console.log(this.material);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getMaterialTypes() {
    this.materialService.getMaterialTypes().subscribe(async (response) => {
      this.materialTypes = response;
      console.log(this.materialTypes);
    }, error => {
      console.log(error);
      }
    );
  }

  getMaterialColors() {
    this.materialService.getColors().subscribe(async (response) => {
      this.materialColors = response;
      console.log(this.materialColors);
    }, error => {
      console.log(error);
      }
    );
  }

  onUpdate(): void {
    this.materialService.updateMaterial(this.material.id, this.material)
    .subscribe(
      (response) => {
        console.log(response);
        //Show a notification
      },
      (error) => {
        // Log it
      }
    );
  }
}
