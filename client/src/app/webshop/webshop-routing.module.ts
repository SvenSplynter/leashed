import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebshopComponent } from './webshop.component';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: WebshopComponent, children: [
    {path: 'home', component: HomeComponent, data: {breadcrumb: 'Home'}},
    {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
    {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
    {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Errors'}},
    {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: 'Shop'}},
    {path: '', component: HomeComponent},
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WebshopRoutingModule { }
