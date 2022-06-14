import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HardwareTypeFormValues, IHardwareType } from 'src/app/models/hardwareType';
import { HardwareService } from '../../hardwares/hardware.service';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-hardware-type',
  templateUrl: './view-hardware-type.component.html',
  styleUrls: ['./view-hardware-type.component.scss']
})
export class ViewHardwareTypeComponent implements OnInit {
  @ViewChild('hardwareTypeDetailsForm') hardwareTypeDetailsForm?: NgForm;
  hardwareTypeId: string | null | undefined;
  hardwareTypeToChange: IHardwareType;
  hardwareType: HardwareTypeFormValues;
  isNewHardwareType = true;
  header = '';

  constructor(private hardwareService: HardwareService, private readonly route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router, public dialog: MatDialog) { 
    this.hardwareType = new HardwareTypeFormValues();
  }

  ngOnInit(): void {
    this.getHardwareType();
  }

  getHardwareType() {
    this.route.paramMap.subscribe(
      (params) => {
        this.hardwareTypeId = params.get('id');
      }
    );
    if (this.hardwareTypeId) {
      if (this.hardwareTypeId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewHardwareType = true;
        this.header = 'Voeg hardware type toe';
      } else {
        this.isNewHardwareType = false;
        this.header = 'Hardware type details';
        this.hardwareService.getHardwareType(this.hardwareTypeId).subscribe(
          (response) => {
            this.hardwareTypeToChange = response;
            this.hardwareType = this.hardwareTypeToChange;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  onUpdate(hardwareType: HardwareTypeFormValues): void {
    if (this.hardwareTypeDetailsForm?.form.valid) {
      this.hardwareService.updateHardwareType(this.hardwareTypeToChange.id, hardwareType)
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
    this.hardwareService.deleteHardwareType(this.hardwareTypeToChange.id)
    .subscribe(
      (response) => {
        this.snackbar.open('Hardware type verwijderd', undefined, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });

        setTimeout(() => {
          this.router.navigateByUrl('hardwaretypes');
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
    if (this.hardwareTypeDetailsForm?.form.valid) {
      this.hardwareService.addHardwareType(this.hardwareType)
      .subscribe(
        (response) => {
          this.snackbar.open('Hardware type toegevoegd', undefined, {
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
