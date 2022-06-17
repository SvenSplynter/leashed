import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    SpinnerOverlayComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    MatProgressSpinnerModule
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    SpinnerOverlayComponent,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
