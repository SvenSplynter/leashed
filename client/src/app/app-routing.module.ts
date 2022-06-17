import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  {path: 'webshop', loadChildren: () => import('./webshop/webshop.module').then(mod => mod.WebshopModule), data: {breadcrumb: 'Home'}},
  {path: '', redirectTo: 'webshop', pathMatch: 'full'},
  {path: '**', redirectTo: 'webshop', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
