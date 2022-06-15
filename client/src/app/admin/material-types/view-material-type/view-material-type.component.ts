import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IMaterialType, MaterialTypeFormValues } from 'src/app/shared/models/materialType';
import { MaterialService } from '../../materials/material.service';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-material-type',
  templateUrl: './view-material-type.component.html',
  styleUrls: ['./view-material-type.component.scss']
})
export class ViewMaterialTypeComponent implements OnInit {
  @ViewChild('materialTypeDetailsForm') materialTypeDetailsForm?: NgForm;
  materialTypeId: string | null | undefined;
  materialTypeToChange: IMaterialType;
  materialType: MaterialTypeFormValues;
  isNewMaterialType = true;
  header = '';

  constructor(private materialService: MaterialService, private readonly route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router, public dialog: MatDialog) {
    this.materialType = new MaterialTypeFormValues();
   }

  ngOnInit(): void {
    this.getMaterialType();
  }

  getMaterialType() {
    this.route.paramMap.subscribe(
      (params) => {
        this.materialTypeId = params.get('id');
      }
    );
    if (this.materialTypeId) {
      if (this.materialTypeId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewMaterialType = true;
        this.header = 'Voeg materiaal type toe';
      } else {
        this.isNewMaterialType = false;
        this.header = 'Materiaal type details';
        this.materialService.getMaterialType(this.materialTypeId).subscribe(
          (response) => {
            this.materialTypeToChange = response;
            this.materialType = this.materialTypeToChange;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  onUpdate(materialType: MaterialTypeFormValues): void {
    if (this.materialTypeDetailsForm?.form.valid) {
      this.materialService.updateMaterialType(this.materialTypeToChange.id, materialType)
        .subscribe(
          (response) => {
            this.snackbar.open('Wijzigingen opgeslagen', undefined, {
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
        )
    }
  }

  onDelete(): void {
    console.log('here');
    console.log(this.materialTypeToChange);
    this.materialService.deleteMaterialType(this.materialTypeToChange.id)
    .subscribe(
      (response) => {
        this.snackbar.open('Materiaal type verwijderd', undefined, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });

        setTimeout(() => {
          this.router.navigateByUrl('materialtypes');
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
    if (this.materialTypeDetailsForm?.form.valid) {
      this.materialService.addMaterialType(this.materialType)
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
