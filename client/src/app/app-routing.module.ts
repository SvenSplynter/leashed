import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './webshop/core/guards/auth.guard';

const routes: Routes = [
  {path: 'admin', canActivate:[AuthGuard], loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  {path: 'webshop', loadChildren: () => import('./webshop/webshop.module').then(mod => mod.WebshopModule), data: {breadcrumb: 'Home'}},
  {path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: {breadcrumb: {skip: true}}},
  {path: '', redirectTo: 'webshop', pathMatch: 'full'},
  {path: '**', redirectTo: 'webshop', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
