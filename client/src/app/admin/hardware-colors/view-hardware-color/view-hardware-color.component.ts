import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IHardwareColor, HardwareColorFormValues } from 'src/app/models/hardwareColor';
import { HardwareService } from '../../hardwares/hardware.service';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-hardware-color',
  templateUrl: './view-hardware-color.component.html',
  styleUrls: ['./view-hardware-color.component.scss']
})
export class ViewHardwareColorComponent implements OnInit {
  @ViewChild('hardwareColorDetailsForm') hardwareColorDetailsForm?: NgForm;
  hardwareColorId: string | null | undefined;
  hardwareColorToChange: IHardwareColor;
  hardwareColor: HardwareColorFormValues;
  isNewHardwareColor = true;
  header = '';

  constructor(private hardwareService: HardwareService, private readonly route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router, public dialog: MatDialog) { 
    this.hardwareColor = new HardwareColorFormValues();
  }

  ngOnInit(): void {
    this.getHardwareColor();
  }

  getHardwareColor() {
    this.route.paramMap.subscribe(
      (params) => {
        this.hardwareColorId = params.get('id');
      }
    );
    if (this.hardwareColorId) {
      if (this.hardwareColorId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewHardwareColor = true;
        this.header = 'Voeg hardware kleur toe';
      } else {
        this.isNewHardwareColor = false;
        this.header = 'Hardware kleur details';
        this.hardwareService.getHardwareColor(this.hardwareColorId).subscribe(
          (response) => {
            this.hardwareColorToChange = response;
            this.hardwareColor = this.hardwareColorToChange;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  onUpdate(hardwareColor: HardwareColorFormValues): void {
    if (this.hardwareColorDetailsForm?.form.valid) {
      this.hardwareService.updateHardwareColor(this.hardwareColorToChange.id, hardwareColor)
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
    this.hardwareService.deleteHardwareColor(this.hardwareColorToChange.id)
    .subscribe(
      (response) => {
        this.snackbar.open('Hardware kleur verwijderd', undefined, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });

        setTimeout(() => {
          this.router.navigateByUrl('hardwarecolors');
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
    if (this.hardwareColorDetailsForm?.form.valid) {
      this.hardwareService.addHardwareColor(this.hardwareColor)
      .subscribe(
        (response) => {
          this.snackbar.open('Hardware kleur toegevoegd', undefined, {
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
