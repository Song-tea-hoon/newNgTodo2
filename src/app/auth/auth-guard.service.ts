import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  redirectUrl: string;

  constructor(private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return undefined;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return undefined;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.isAdmin()) {
    //   return true;
    // }
    this.redirectUrl = '/admin';
    this.router.navigateByUrl('/login');
    return false;

  }

}
