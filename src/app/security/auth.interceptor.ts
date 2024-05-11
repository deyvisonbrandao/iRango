import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private injector: Injector){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService);

        if(loginService.isLoggedin()){
            const authRequest = req.clone(
                {setHeaders: {'Authorization':`Bearer ${loginService.user.accessToken}`}});
            return next.handle(authRequest);
        }else{
            return next.handle(req);
        }
    }
}