import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HardwareFormValues, IHardware } from 'src/app/shared/models/hardware';
import { IHardwareColor } from 'src/app/shared/models/hardwareColor';
import { IHardwareMaterial } from 'src/app/shared/models/hardwareMaterial';
import { IHardwareType } from 'src/app/shared/models/hardwareType';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { HardwareService } from '../hardware.service';

@Component({
  selector: 'app-view-hardware',
  templateUrl: './view-hardware.component.html',
  styleUrls: ['./view-hardware.component.scss']
})
export class ViewHardwareComponent implements OnInit {
  @ViewChild('hardwareDetailsForm') hardwareDetailsForm: NgForm;
  hardwareId: string | null | undefined;
  hardware: HardwareFormValues;
  hardwareToChange: IHardware;
  hardwareTypes: IHardwareType[];
  hardwareMaterials: IHardwareMaterial[];
  hardwareColors: IHardwareColor[];
  isNewHardware = true;
  header = '';

  constructor(private hardwareService: HardwareService, private readonly route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router, public dialog: MatDialog) { 
    this.hardware = new HardwareFormValues();
  }

  ngOnInit(): void {
    this.getHardwareTypes();
    this.getHardwareMaterials();
    this.getHardwareColors();
    this.getHardware();
  }

  getHardware() {
    this.route.paramMap.subscribe(
      (params) => {
        this.hardwareId = params.get('id');
      }
    );
    if (this.hardwareId) {
      if(this.hardwareId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewHardware = true;
        this.header = 'Voeg materiaal toe';
      } else {
        this.isNewHardware = false;
        this.header = 'Materiaal details';
        this.hardwareService.getHardware(this.hardwareId).subscribe(
          (response) => {
            this.hardwareToChange = response;
            this.hardware = this.hardwareToChange;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  getHardwareTypes() {
    this.hardwareService.getHardwareTypes().subscribe(async (response) => {
      this.hardwareTypes = response;
    }, error => {
      console.log(error);
      }
    );
  }

  getHardwareMaterials() {
    this.hardwareService.getHardwareMaterials().subscribe(async (response) => {
      this.hardwareMaterials = response;
    }, error => {
      console.log(error);
      }
    );
  }

  getHardwareColors() {
    this.hardwareService.getHardwareColors().subscribe(async (response) => {
      this.hardwareColors = response;
    }, error => {
      console.log(error);
      }
    );
  }

  onUpdate(hardware: HardwareFormValues): void {
    if (this.hardwareDetailsForm?.form.valid) {
      this.hardwareService.updateHardware(this.hardwareToChange.id, hardware)
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
      );
    }
  }

  onDelete(): void {
    this.hardwareService.deleteHardware(this.hardwareToChange.id)
      .subscribe(
        (response) => {
          this.snackbar.open('Hardware verwijderd', undefined, {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });

          setTimeout(() => {
            this.router.navigateByUrl('hardwares');
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
    if (this.hardwareDetailsForm?.form.valid) {
      this.hardwareService.addHardware(this.hardware)
        .subscribe(
          (response) => {
            this.snackbar.open('Hardware toegevoegd', undefined, {
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
