import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  {path: 'shop', component: ShopComponent},
  {path: '', redirectTo: 'shop', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
