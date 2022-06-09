import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { ColorsComponent } from './colors/colors.component';
import { HardwareColorsComponent } from './hardware-colors/hardware-colors.component';
import { HardwareMaterialsComponent } from './hardware-materials/hardware-materials.component';
import { HardwareTypesComponent } from './hardware-types/hardware-types.component';
import { HardwaresComponent } from './hardwares/hardwares.component';
import { MaterialTypesComponent } from './material-types/material-types.component';
import { MaterialsComponent } from './materials/materials.component';
import { ViewMaterialComponent } from './materials/view-material/view-material.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { ViewProductTypeComponent } from './product-types/view-product-type/view-product-type.component';
import { ProductsComponent } from './products/products.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { StockMaterialsComponent } from './stock-materials/stock-materials.component';

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
    {path: 'materialtypes', component: MaterialTypesComponent},
    {path: 'colors', component: ColorsComponent},
    {path: 'hardwares', component: HardwaresComponent},
    {path: 'hardwaretypes', component: HardwareTypesComponent},
    {path: 'hardwarematerials', component: HardwareMaterialsComponent},
    {path: 'hardwarecolors', component: HardwareColorsComponent},
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
