import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IHardwareMaterial, HardwareMaterialFormValues } from 'src/app/models/hardwareMaterial';
import { HardwareService } from '../../hardwares/hardware.service';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-hardware-material',
  templateUrl: './view-hardware-material.component.html',
  styleUrls: ['./view-hardware-material.component.scss']
})
export class ViewHardwareMaterialComponent implements OnInit {
  @ViewChild('hardwareMaterialDetailsForm') hardwareMaterialDetailsForm?: NgForm;
  hardwareMaterialId: string | null | undefined;
  hardwareMaterialToChange: IHardwareMaterial;
  hardwareMaterial: HardwareMaterialFormValues;
  isNewHardwareMaterial = true;
  header = '';

  constructor(private hardwareService: HardwareService, private readonly route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router, public dialog: MatDialog) { 
    this.hardwareMaterial = new HardwareMaterialFormValues();
  }

  ngOnInit(): void {
    this.getHardwareMaterial();
  }

  getHardwareMaterial() {
    this.route.paramMap.subscribe(
      (params) => {
        this.hardwareMaterialId = params.get('id');
      }
    );
    if (this.hardwareMaterialId) {
      if (this.hardwareMaterialId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewHardwareMaterial = true;
        this.header = 'Voeg hardware materiaal toe';
      } else {
        this.isNewHardwareMaterial = false;
        this.header = 'Hardware materiaal details';
        this.hardwareService.getHardwareMaterial(this.hardwareMaterialId).subscribe(
          (response) => {
            this.hardwareMaterialToChange = response;
            this.hardwareMaterial = this.hardwareMaterialToChange;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  onUpdate(hardwareMaterial: HardwareMaterialFormValues): void {
    if (this.hardwareMaterialDetailsForm?.form.valid) {
      this.hardwareService.updateHardwareMaterial(this.hardwareMaterialToChange.id, hardwareMaterial)
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
    this.hardwareService.deleteHardwareMaterial(this.hardwareMaterialToChange.id)
    .subscribe(
      (response) => {
        this.snackbar.open('Hardware materiaal verwijderd', undefined, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });

        setTimeout(() => {
          this.router.navigateByUrl('hardwarematerials');
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
    if (this.hardwareMaterialDetailsForm?.form.valid) {
      this.hardwareService.addHardwareMaterial(this.hardwareMaterial)
      .subscribe(
        (response) => {
          this.snackbar.open('Hardware materiaal toegevoegd', undefined, {
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
