import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IHardware } from 'src/app/models/hardware';
import { DefaultHardwareParams, EndCapsParams, HardwareParams, HookParams, KeychainParams, ORingParams, StopBarParams } from 'src/app/models/hardwareParams';
import { IMaterial } from 'src/app/models/material';
import { DefaultMaterialParams, FinishMaterialParams, MaterialParams } from 'src/app/models/materialParams';
import { IProduct, ProductFormValues } from 'src/app/models/product';
import { IProductType } from 'src/app/models/productType';
import { HardwareService } from '../../hardwares/hardware.service';
import { MaterialService } from '../../materials/material.service';
import { ProductService } from '../product.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  @ViewChild('productDetailsForm') productDetailsForm?: NgForm;
  productId: string | null | undefined;
  product: ProductFormValues;
  productToChange: IProduct;
  productTypes: IProductType[];
  materials: IMaterial[];
  materialParams = new MaterialParams();
  finishMaterials: IMaterial[];
  finishMaterialParams = new FinishMaterialParams();
  defaultMaterials: IMaterial[];
  defaultMaterialParams = new DefaultMaterialParams();
  hardwares: IHardware[];
  hardwareParams = new HardwareParams();
  addPhotoMode = false;
  progress = 0;
  isNewProduct = true;
  header = '';
  hooks: IHardware[];
  hookParams = new HookParams();
  oRings: IHardware[];
  oRingParams = new ORingParams();
  stopBars: IHardware[];
  stopBarParams = new StopBarParams();
  keychains: IHardware[];
  keychainParams = new KeychainParams();
  endCaps: IHardware[];
  endCapParams = new EndCapsParams();
  defaultHardware: IHardware[];
  defaultHardwareParams = new DefaultHardwareParams();
  todayDate = new Date();


  constructor(private productService: ProductService, private readonly route: ActivatedRoute,
    private materialService: MaterialService,
    private hardwareService: HardwareService,
    private snackbar: MatSnackBar,
    private router: Router,
    public datepipe: DatePipe,
    public dialog: MatDialog) {
    this.product = new ProductFormValues();
  }

  ngOnInit(): void {
    this.getMaterials();
    this.getFinishMaterials();
    this.getProductTypes();
    this.getHardwares();
    this.getHooks();
    this.getORings();
    this.getStopBars();
    this.getKeychains();
    this.getEndCaps();
    this.getProduct();
  }

  getProduct() {
    this.route.paramMap.subscribe(
      (params) => {
        this.productId = params.get('id');
      }
    );
    if (this.productId) {

      if (this.productId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewProduct = true;
        this.header = 'Voeg product toe';
        console.log(this.product);
      } else {

        this.isNewProduct = false;
        this.header = 'Product details';
        this.productService.getProduct(this.productId).subscribe(
          (response) => {
            this.productToChange = response;
            console.log(this.productToChange);
            this.product = this.productToChange;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe(async (response) => {
      this.productTypes = response;
      console.log(this.productTypes);
    }, error => {
      console.log(error);
    }
    );
  }

  getMaterials() {
    this.materialService.getMaterials(this.materialParams).subscribe(response => {
      console.log(response);
      this.materials = response.data;
      console.log(this.materials);
    }, error => {
      console.log(error);
    });
  }

  getFinishMaterials() {
    this.materialService.getMaterials(this.finishMaterialParams).subscribe(response => {
      console.log('finish');
      console.log(response);
      this.finishMaterials = response.data;
    }, error => {
      console.log(error);
    });
    this.materialService.getMaterials(this.defaultMaterialParams).subscribe(response => {
      this.defaultMaterials = response.data;
      this.finishMaterials.push(this.defaultMaterials[0]);
    }, error => {
      console.log(error);
    });
  }

  getHardwares() {
    this.hardwareService.getHardwares(this.hardwareParams).subscribe(response => {
      console.log(response);
      this.hardwares = response.data;
      console.log(this.hardwares);
    }, error => {
      console.log(error);
    });
  }

  getHooks() {
    this.hardwareService.getHardwares(this.hookParams).subscribe(response => {
      console.log(response);
      this.hooks = response.data;
      console.log(this.hooks);
    }, error => {
      console.log(error);
    });
    this.hardwareService.getHardwares(this.defaultHardwareParams).subscribe(response => {
      this.defaultHardware = response.data;
      this.hooks.push(this.defaultHardware[0]);
    }, error => {
      console.log(error);
    });
  }

  getORings() {
    this.hardwareService.getHardwares(this.oRingParams).subscribe(response => {
      console.log(response);
      this.oRings = response.data;
      console.log(this.oRings);
    }, error => {
      console.log(error);
    });
    this.hardwareService.getHardwares(this.defaultHardwareParams).subscribe(response => {
      this.defaultHardware = response.data;
      this.oRings.push(this.defaultHardware[0]);
    }, error => {
      console.log(error);
    });
  }

  getStopBars() {
    this.hardwareService.getHardwares(this.stopBarParams).subscribe(response => {
      console.log(response);
      this.stopBars = response.data;
      console.log(this.stopBars);
    }, error => {
      console.log(error);
    });
    this.hardwareService.getHardwares(this.defaultHardwareParams).subscribe(response => {
      this.defaultHardware = response.data;
      this.stopBars.push(this.defaultHardware[0]);
    }, error => {
      console.log(error);
    });
  }

  getKeychains() {
    this.hardwareService.getHardwares(this.keychainParams).subscribe(response => {
      console.log(response);
      this.keychains = response.data;
      console.log(this.keychains);
    }, error => {
      console.log(error);
    });
    this.hardwareService.getHardwares(this.defaultHardwareParams).subscribe(response => {
      this.defaultHardware = response.data;
      this.keychains.push(this.defaultHardware[0]);
    }, error => {
      console.log(error);
    });
  }

  getEndCaps() {
    this.hardwareService.getHardwares(this.endCapParams).subscribe(response => {
      console.log(response);
      this.endCaps = response.data;
      console.log(this.endCaps);
    }, error => {
      console.log(error);
    });
    this.hardwareService.getHardwares(this.defaultHardwareParams).subscribe(response => {
      this.defaultHardware = response.data;
      this.endCaps.push(this.defaultHardware[0]);
    }, error => {
      console.log(error);
    });
  }

  onUpdate(product: ProductFormValues): void {
    if (this.productDetailsForm?.form.valid) {
      product.lastUpdated = this.datepipe.transform(product.lastUpdated, 'MM-dd-yyyy');
      this.productService.updateProduct(this.productToChange.id, product)
        .subscribe(
          (response) => {
            console.log(response);
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
    else {
      console.log(this.productDetailsForm?.form.valid);
    }
  }

  onDelete(): void {
    this.productService.deleteProduct(this.productToChange.id)
      .subscribe(
        (response) => {
          console.log(response);
          this.snackbar.open('Product verwijderd', undefined, {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });

          setTimeout(() => {
            this.router.navigateByUrl('products');
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
    if (this.productDetailsForm?.form.valid) {
      this.productService.addProduct(this.product)
        .subscribe(
          (response) => {
            console.log(response);
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

  addPhotoModeToggle() {
    this.addPhotoMode = !this.addPhotoMode;
  }

  uploadFile(file: File) {
    this.productService.uploadImage(file, +this.route.snapshot.paramMap.get('id')).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.productToChange = event.body;
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
    this.productService.deleteProductPhoto(photoId, +this.route.snapshot.paramMap.get('id')).subscribe(() => {
      const photoIndex = this.productToChange.photos.findIndex(x => x.id === photoId);
      this.productToChange.photos.splice(photoIndex, 1);
    }, error => {
      this.snackbar.open('Problem deleting image', undefined, {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      console.log(error);
    });
  }

  setMainPhoto(photoId: number) {
    this.productService.setMainPhoto(photoId, this.productToChange.id).subscribe((product: IProduct) => {
      this.productToChange = product;
    });
  }

  openDialog() {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(
      (result) => {
        if(result) {
          this.onDelete();
        }
      }
    );
  }
}
