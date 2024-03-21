import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { CartSourceService } from '../../services/cart-source.service';
import { takeUntil, tap, debounceTime } from 'rxjs';
import { CartItem } from '../../entities/cart-item.entity';
import { VatService } from '../../services/vat.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  items$ = this.cartSrv.items$;

  vat$ = this.vatSrv.vat$;

  // Voglio prendere solo l'ultimo valore dai tanti che
  // vengono inviati
private updateQuantity$ = new Subject<{id: string, quantity: number}>();
private destroyed$ = new Subject<void>();

  constructor(protected cartSrv: CartSourceService,
              protected vatSrv: VatService) {}

  ngOnInit(): void {
    this.vatSrv.setCountry('IT');
    this.updateQuantity$
    .pipe(
      takeUntil(this.destroyed$),
      /*tap((val) => {
        console.log(`event ${val}`)
      }),*/
      //lo usiamo per limitare le chiamate
      debounceTime(150), // valori in arrivo ogni 150 ms 
    )
    .subscribe(({id, quantity}) => {
      console.log(`api call ${id}`)

      //che elemento vado ad aggiornare?
      // su quale quantità?
      this.cartSrv.setQuantity(id, quantity);

    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  trackById(_: number, item: CartItem) {
    return item.id;
  }

  changeQuantity(item: CartItem, newQuantity: number) {
    //this.cartSrv.setQuantity(item.id, newQuantity);
    this.updateQuantity$.next({id: item.id, quantity: newQuantity});

  }
}
