import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Auth1Service } from "./auth1.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: Auth1Service, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let url = state.url;
    return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if(this.authService.isLoggedIn){
        return true;
        }

        this.authService.redirectUrl = url;

        this.router.navigate(['/login'])
    }
}
