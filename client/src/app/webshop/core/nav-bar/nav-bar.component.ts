import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from 'src/app/shared/models/basket';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  itemCount: number = 0;

  constructor(private basketService: BasketService) { }

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
  }

  // getTotalBasketItems(basket$: Observable<IBasket>): number {
  //   return basket$.
  // }

}
