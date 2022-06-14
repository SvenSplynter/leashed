import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IMaterial } from 'src/app/models/material';
import { IStockMaterial, StockMaterialFormValues } from 'src/app/models/stockMaterial';
import { MaterialService } from '../../materials/material.service';
import { MaterialParams } from 'src/app/models/materialParams';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-stock-materials',
  templateUrl: './view-stock-materials.component.html',
  styleUrls: ['./view-stock-materials.component.scss']
})
export class ViewStockMaterialsComponent implements OnInit {
  @ViewChild('stockmaterialDetailsForm') stockmaterialDetailsForm?: NgForm;
  stockmaterialId: string | null | undefined;
  stockmaterial: StockMaterialFormValues;
  stockmaterialToChange: IStockMaterial;
  materials: IMaterial[];
  materialParams = new MaterialParams();
  isNewStockmaterial = true;
  header = '';

  constructor(private materialService: MaterialService, private readonly route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router, public dialog: MatDialog) {
    this.stockmaterial = new StockMaterialFormValues();
  }

  ngOnInit(): void {
    this.getMaterials();
    this.getStockMaterial();
  }

  getStockMaterial() {
    this.route.paramMap.subscribe(
      (params) => {
        this.stockmaterialId = params.get('id');
      }
    );
    if (this.stockmaterialId) {
      if (this.stockmaterialId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewStockmaterial = true;
        this.header = 'Voeg stockmateriaal toe';
      } else {
        this.isNewStockmaterial = false;
        this.header = 'Stockmateriaal details';
        this.materialService.getStockMaterial(this.stockmaterialId).subscribe(
          (response) => {
            this.stockmaterialToChange = response;
            this.stockmaterial = this.stockmaterialToChange;
            console.log(this.stockmaterial);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  getMaterials() {
    this.materialService.getMaterials(this.materialParams).subscribe(response => {
      this.materials = response.data;
    }, error => {
      console.log(error);
    });
  }

  onUpdate(stockmaterial: StockMaterialFormValues): void {
    if (this.stockmaterialDetailsForm?.form.valid) {
      this.materialService.updateStockMaterial(this.stockmaterialToChange.id, stockmaterial)
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
    this.materialService.deleteStockMaterial(this.stockmaterialToChange.id)
      .subscribe(
        (response) => {
          this.snackbar.open('Stockmateriaal verwijderd', undefined, {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });

          setTimeout(() => {
            this.router.navigateByUrl('stockmaterials');
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
    if (this.stockmaterialDetailsForm?.form.valid) {
      this.materialService.addStockMaterial(this.stockmaterial)
        .subscribe(
          (response) => {
            this.snackbar.open('Stockmateriaal toegevoegd', undefined, {
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
