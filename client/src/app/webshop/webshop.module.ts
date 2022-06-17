import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebshopComponent } from './webshop.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core/core.module';
import { WebshopRoutingModule } from './webshop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { ProductItemComponent } from './shop/product-item/product-item.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';


@NgModule({
  declarations: [
    WebshopComponent,
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    WebshopRoutingModule
  ],
  exports: [
    WebshopComponent,
    SharedModule
  ],
  providers: [
    
  ]
})
export class WebshopModule { }
