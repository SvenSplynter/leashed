import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductType, ProductTypeFormValues } from 'src/app/models/productType';
import { ProductService } from '../../products/product.service';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-product-type',
  templateUrl: './view-product-type.component.html',
  styleUrls: ['./view-product-type.component.scss']
})
export class ViewProductTypeComponent implements OnInit {
  @ViewChild('productTypeDetailsForm') productTypeDetailsForm?: NgForm;
  productTypeId: string | null | undefined;
  productTypeToChange: IProductType;
  productType: ProductTypeFormValues;
  isNewProductType = true;
  header = '';

  constructor(private productService: ProductService, private readonly route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router, public dialog: MatDialog) {
    this.productType = new ProductTypeFormValues()
  }

  ngOnInit(): void {
    this.getProductType();
  }

  getProductType() {
    this.route.paramMap.subscribe(
      (params) => {
        this.productTypeId = params.get('id');
      }
    );
    if (this.productTypeId) {
      if (this.productTypeId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewProductType = true;
        this.header = 'Voeg product type toe';
      } else {
        this.isNewProductType = false;
        this.header = 'Product type details';
        this.productService.getProductType(this.productTypeId).subscribe(
          (response) => {
            this.productTypeToChange = response;
            this.productType = this.productTypeToChange;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  onUpdate(productType: ProductTypeFormValues): void {
    if (this.productTypeDetailsForm?.form.valid) {
      this.productService.updateProductType(this.productTypeToChange.id, productType)
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
    console.log(this.productTypeToChange);
    this.productService.deleteProductType(this.productTypeToChange.id)
    .subscribe(
      (response) => {
        this.snackbar.open('Product type verwijderd', undefined, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });

        setTimeout(() => {
          this.router.navigateByUrl('producttypes');
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
    if (this.productTypeDetailsForm?.form.valid) {
      this.productService.addProductType(this.productType)
      .subscribe(
        (response) => {
          this.snackbar.open('Product toegevoegd', undefined, {
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
