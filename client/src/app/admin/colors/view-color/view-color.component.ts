import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorFormValues, IColor } from 'src/app/shared/models/color';
import { MaterialService } from '../../materials/material.service';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-color',
  templateUrl: './view-color.component.html',
  styleUrls: ['./view-color.component.scss']
})
export class ViewColorComponent implements OnInit {
  @ViewChild('colorDetailsForm') colorDetailsForm?: NgForm;
  colorId: string | null | undefined;
  color: ColorFormValues;
  colorToChange: IColor;
  addPhotoMode = false;
  progress = 0;
  isNewColor = true;
  header = '';

  constructor(private materialService: MaterialService, private readonly route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router, public dialog: MatDialog) { 
    this.color = new ColorFormValues();
  }

  ngOnInit(): void {
    this.getColor();
  }

  getColor() {
    this.route.paramMap.subscribe(
      (params) => {
        this.colorId = params.get('id');
      }
    );
    if (this.colorId) {

      if (this.colorId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewColor = true;
        this.header = 'Voeg kleur toe';
      } else {

        this.isNewColor = false;
        this.header = 'Kleur details';
        this.materialService.getColor(this.colorId).subscribe(
          (response) => {
            this.colorToChange = response;
            this.color = this.colorToChange;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  onUpdate(color: ColorFormValues): void {
    if (this.colorDetailsForm?.form.valid) {
      this.materialService.updateColor(this.colorToChange.id, color)
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
    this.materialService.deleteColor(this.colorToChange.id)
      .subscribe(
        (response) => {
          this.snackbar.open('Kleur verwijderd', undefined, {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });

          setTimeout(() => {
            this.router.navigateByUrl('colors');
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
    if (this.colorDetailsForm?.form.valid) {
      this.materialService.addColor(this.color)
        .subscribe(
          (response) => {
            this.snackbar.open('Kleur toegevoegd', undefined, {
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

  addPhotoModeToggle() {
    this.addPhotoMode = !this.addPhotoMode;
  }

  uploadFile(file: File) {
    this.materialService.uploadImage(file, +this.route.snapshot.paramMap.get('id')).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.colorToChange = event.body;
          setTimeout(() => {
            this.progress = 0;
            this.addPhotoMode = false;
          }, 1500);
      }
    }, error => {
      if (error.errors) {
        console.log(error.errors[0]);
        this.snackbar.open('Oops, kijk in de console', undefined, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      } else {
        this.snackbar.open('Problem uploading image', undefined, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
      this.progress = 0;
    });
  }

  deletePhoto(photoId: number) {
    this.materialService.deleteColorPhoto(photoId, +this.route.snapshot.paramMap.get('id')).subscribe(() => {
      const photoIndex = this.colorToChange.photos.findIndex(x => x.id === photoId);
      this.colorToChange.photos.splice(photoIndex, 1);
    }, error => {
      this.snackbar.open('Problem deleting image', undefined, {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      console.log(error);
    });
  }

  setMainPhoto(photoId: number) {
    this.materialService.setMainPhoto(photoId, this.colorToChange.id).subscribe((color: IColor) => {
      this.colorToChange = color;
    });
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
