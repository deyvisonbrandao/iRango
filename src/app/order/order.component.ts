import { Component, OnInit } from '@angular/core';
import { RadioOptions } from 'app/shared/radio/radio-options.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-details/shopping-cart/shopping-cart.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ir-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;
  orderForm: FormGroup
  delivery: number = 8;
  orderId: string;

  paymentOptions: RadioOptions[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Vale Refeição', value: 'REF'}
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('',[Validators.required])
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'});
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if(!email || !emailConfirmation){
      return undefined;
    }
    if (email.value !== emailConfirmation.value){
      return {emailsNotMatch:true};
    }
    return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems():CartItem[]{
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem){
    return this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem){
    return this.orderService.decreaseQty(item);
  }

  remove(item: CartItem){
    return this.orderService.remove(item);
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order).pipe(
      tap((orderId: string) => {
        this.orderId = orderId;
      })
    )
    .subscribe((orderId: string) => {
      this.router.navigate(['/order-summary']);
      this.orderService.clear();
    });
  }

  isOrderCompleted(): boolean{
    return this.orderId !== undefined;
  }

}
