import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'app/restaurant-details/shopping-cart/shopping-cart.model';

@Component({
  selector: 'ir-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[];
  @Output() increaseQty = new EventEmitter<CartItem>();
  @Output() decreaseQty = new EventEmitter<CartItem>();
  @Output() remove = new EventEmitter<CartItem>();

  constructor() { }

  ngOnInit() {
  }

  emitIncreaseQty(item: CartItem){
    this.increaseQty.emit(item);
  }

  emitDecreaseQty(item: CartItem){
    this.decreaseQty.emit(item);
  }

  emitRemove(item: CartItem){
    this.remove.emit(item);
  }
}
