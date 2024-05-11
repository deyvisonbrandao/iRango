import { ModuleWithProviders, NgModule } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { ShoppingCartService } from "app/restaurant-details/shopping-cart/shopping-cart.service";
import { OrderService } from "app/order/order.service";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from "./messages/notification.service";
import { LoginService } from "app/security/login/login.service";
import { LoggedInGuard } from "app/security/loggedin.guard";
import { LeaveOrderGuard } from "app/order/leave-order.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "app/security/auth.interceptor";

@NgModule({
    declarations:[
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports:[
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ]
})
export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers:[
                RestaurantsService,
                ShoppingCartService,
                OrderService,
                NotificationService,
                LoginService,
                LoggedInGuard,
                LeaveOrderGuard,
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
            ]
        }
    }
}