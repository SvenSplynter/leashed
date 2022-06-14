import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { ColorsComponent } from './colors/colors.component';
import { ViewColorComponent } from './colors/view-color/view-color.component';
import { HardwareColorsComponent } from './hardware-colors/hardware-colors.component';
import { ViewHardwareColorComponent } from './hardware-colors/view-hardware-color/view-hardware-color.component';
import { HardwareMaterialsComponent } from './hardware-materials/hardware-materials.component';
import { ViewHardwareMaterialComponent } from './hardware-materials/view-hardware-material/view-hardware-material.component';
import { HardwareTypesComponent } from './hardware-types/hardware-types.component';
import { ViewHardwareTypeComponent } from './hardware-types/view-hardware-type/view-hardware-type.component';
import { HardwaresComponent } from './hardwares/hardwares.component';
import { ViewHardwareComponent } from './hardwares/view-hardware/view-hardware.component';
import { MaterialTypesComponent } from './material-types/material-types.component';
import { ViewMaterialTypeComponent } from './material-types/view-material-type/view-material-type.component';
import { MaterialsComponent } from './materials/materials.component';
import { ViewMaterialComponent } from './materials/view-material/view-material.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { ViewProductTypeComponent } from './product-types/view-product-type/view-product-type.component';
import { ProductsComponent } from './products/products.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { StockMaterialsComponent } from './stock-materials/stock-materials.component';
import { ViewStockMaterialsComponent } from './stock-materials/view-stock-materials/view-stock-materials.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: 'home', component: AdminHomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/:id', component: ViewProductComponent},
    {path: 'producttypes', component: ProductTypesComponent},
    {path: 'producttypes/:id', component: ViewProductTypeComponent},
    {path: 'materials', component: MaterialsComponent},
    {path: 'materials/:id', component: ViewMaterialComponent},
    {path: 'stockmaterials', component: StockMaterialsComponent},
    {path: 'stockmaterials/:id', component: ViewStockMaterialsComponent},
    {path: 'materialtypes', component: MaterialTypesComponent},
    {path: 'materialtypes/:id', component: ViewMaterialTypeComponent},
    {path: 'colors', component: ColorsComponent},
    {path: 'colors/:id', component: ViewColorComponent},
    {path: 'hardwares', component: HardwaresComponent},
    {path: 'hardwares/:id', component: ViewHardwareComponent},
    {path: 'hardwaretypes', component: HardwareTypesComponent},
    {path: 'hardwaretypes/:id', component: ViewHardwareTypeComponent},
    {path: 'hardwarematerials', component: HardwareMaterialsComponent},
    {path: 'hardwarematerials/:id', component: ViewHardwareMaterialComponent},
    {path: 'hardwarecolors', component: HardwareColorsComponent},
    {path: 'hardwarecolors/:id', component: ViewHardwareColorComponent},
    {path: '', component: AdminHomeComponent}
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
