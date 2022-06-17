import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ShopRoutingModule
  ],
  exports: []
})
export class ShopModule { }
