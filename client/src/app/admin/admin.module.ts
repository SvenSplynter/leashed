import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MaterialsComponent } from './materials/materials.component';
import { StockMaterialsComponent } from './stock-materials/stock-materials.component';
import { ColorsComponent } from './colors/colors.component';
import { HardwaresComponent } from './hardwares/hardwares.component';
import { HardwareMaterialsComponent } from './hardware-materials/hardware-materials.component';
import { HardwareTypesComponent } from './hardware-types/hardware-types.component';
import { MaterialTypesComponent } from './material-types/material-types.component';
import { HardwareColorsComponent } from './hardware-colors/hardware-colors.component';
import { ViewProductTypeComponent } from './product-types/view-product-type/view-product-type.component';
import { ViewMaterialComponent } from './materials/view-material/view-material.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { PhotoWidgetComponent } from './shared/photo-widget/photo-widget.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { ViewStockMaterialsComponent } from './stock-materials/view-stock-materials/view-stock-materials.component';
import { ViewMaterialTypeComponent } from './material-types/view-material-type/view-material-type.component';
import { ViewColorComponent } from './colors/view-color/view-color.component';
import { ViewHardwareComponent } from './hardwares/view-hardware/view-hardware.component';
import { ViewHardwareTypeComponent } from './hardware-types/view-hardware-type/view-hardware-type.component';
import { ViewHardwareMaterialComponent } from './hardware-materials/view-hardware-material/view-hardware-material.component';
import { ViewHardwareColorComponent } from './hardware-colors/view-hardware-color/view-hardware-color.component';


@NgModule({
  declarations: [
    ProductsComponent,
    TopNavComponent,
    AdminComponent,
    AdminHomeComponent,
    ProductTypesComponent,
    MaterialsComponent,
    StockMaterialsComponent,
    ColorsComponent,
    HardwaresComponent,
    HardwareMaterialsComponent,
    HardwareTypesComponent,
    MaterialTypesComponent,
    HardwareColorsComponent,
    ViewProductTypeComponent,
    ViewMaterialComponent,
    ViewProductComponent,
    PhotoWidgetComponent,
    DeleteDialogComponent,
    ViewStockMaterialsComponent,
    ViewMaterialTypeComponent,
    ViewColorComponent,
    ViewHardwareComponent,
    ViewHardwareTypeComponent,
    ViewHardwareMaterialComponent,
    ViewHardwareColorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgxDropzoneModule,
    ImageCropperModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [DatePipe]
})
export class AdminModule { }
