import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  itemCount: number = 0;
  currentUser$: Observable<IUser>;
  isAdmin$: Observable<boolean>;

  constructor(private basketService: BasketService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basket$
      .subscribe({
        next: (response) => {
          if(response) {
            this.itemCount = response.items.reduce((a,b) => +a + +b.quantity, 0);
          }
        },
        error: (error) => {
          console.log(error); 
        }
      });
      this.currentUser$ = this.accountService.currentUser$;
      this.isAdmin$ = this.accountService.isAdmin$;
  }

  logout() {
    this.accountService.logout();
  }

  // getTotalBasketItems(basket$: Observable<IBasket>): number {
  //   return basket$.
  // }

}
