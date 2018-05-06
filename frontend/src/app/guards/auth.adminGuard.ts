import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Auth1Service } from "./../services/auth1.service";

@Injectable()
export class AdminAccess implements CanActivate {
    constructor(private authService: Auth1Service, private router: Router) {}

    canActivate() {
    let isManager: boolean = this.authService.isManager();
    if (!isManager) {
    }
    return isManager;
  }
}