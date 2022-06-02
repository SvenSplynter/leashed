import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: 'home', component: AdminHomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'producttypes', component: ProductTypesComponent},
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
