import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IColor } from 'src/app/shared/models/color';
import { IMaterial, MaterialFormValues } from 'src/app/shared/models/material';
import { IMaterialType } from 'src/app/shared/models/materialType';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.scss']
})
export class ViewMaterialComponent implements OnInit {
  @ViewChild('materialDetailsForm') materialDetailsForm?: NgForm;
  materialId: string | null | undefined;
  material: MaterialFormValues;
  materialToChange: IMaterial;
  materialTypes: IMaterialType[];
  materialColors: IColor[];
  isNewMaterial = true;
  header = '';

  constructor(private materialService: MaterialService, private readonly route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router, public dialog: MatDialog) { 
    this.material = new MaterialFormValues();
  }

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
      if(this.materialId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewMaterial = true;
        this.header = 'Voeg materiaal toe';
      } else {
        this.isNewMaterial = false;
        this.header = 'Materiaal details';
        this.materialService.getMaterial(this.materialId).subscribe(
          (response) => {
            this.materialToChange = response;
            this.material = this.materialToChange;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  getMaterialTypes() {
    this.materialService.getMaterialTypes().subscribe(async (response) => {
      this.materialTypes = response;
    }, error => {
      console.log(error);
      }
    );
  }

  getMaterialColors() {
    this.materialService.getColors().subscribe(async (response) => {
      this.materialColors = response;
    }, error => {
      console.log(error);
      }
    );
  }

  onUpdate(material: MaterialFormValues): void {
    if (this.materialDetailsForm?.form.valid) {
      this.materialService.updateMaterial(this.materialToChange.id, material)
      .subscribe(
        (response) => {
          this.snackbar.open('Wijzigingen opgeslagen', undefined, {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
         window.location.reload();
        },
        (error) => {
          console.log(error);
          this.snackbar.open('Er is een fout opgetreden', undefined, {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      );
    }
  }

  onDelete(): void {
    this.materialService.deleteMaterial(this.materialToChange.id)
      .subscribe(
        (response) => {
          this.snackbar.open('Materiaal verwijderd', undefined, {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });

          setTimeout(() => {
            this.router.navigateByUrl('materials');
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.snackbar.open('Probleem bij verwijderen', undefined, {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      );
  }

  onAdd() {
    if (this.materialDetailsForm?.form.valid) {
      this.materialService.addMaterial(this.material)
        .subscribe(
          (response) => {
            this.snackbar.open('Materiaal toegevoegd', undefined, {
              duration: 2000,
              panelClass: ['mat-toolbar', 'mat-primary']
            });
          },
          (error) => {
            console.log(error);
            this.snackbar.open('Er is een fout opgetreden', undefined, {
              duration: 2000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          }
        );
    }
  }

  openDialog() {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(
      (result) => {
        if (result) {
          this.onDelete();
        }
      }
    );
  }

}
