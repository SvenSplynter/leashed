import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  SubmitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        this.snackbar.open("Bestelling geplaatst!", "Ok", {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.basketService.deleteLocalBasket(basket.id);
        this.router.navigate(['/webshop/checkout/success']);
      },
      (error) => {
        this.snackbar.open(error.message, "Ok", {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        console.log(error);
      }
    )
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,
      buyerEmail: this.checkoutForm.get('addressForm').get('email').value
    };
  }

}
