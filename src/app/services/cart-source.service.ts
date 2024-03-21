import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../entities/cart-item.entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartSourceService {
  protected _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  constructor(protected http: HttpClient){
    this.fetch();
  }
  setQuantity(id: string, quantity: number) {
    this.http.patch<CartItem>(`/api/cart-items/{index}$`,{quantity})
    .subscribe(updated => {
    const index = this._items$.value.findIndex(item => item.id === id);
    const tmp = structuredClone(this._items$.value);
    //tmp[index].quantity = quantity;
    tmp[index] = updated;
    this._items$.next(tmp);
  })
  }


  fetch(){
    // get ha come param un obs. il ris è un solo valore
      this.http.get<CartItem[]>('/api/cart-items')
      .subscribe(items =>{ // viene chiamato una sola volta r
          this._items$.next(items)
      })
  }
}
