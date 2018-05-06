import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Injectable } from "@angular/core";
import { Auth1Service } from "./../services/auth1.service";

@Injectable()
export class UserAccessGuard implements CanActivate {
    constructor(private authService: Auth1Service) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return route.data['onlyGuests'] != this.authService.isLoggedIn;
    }
}