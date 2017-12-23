import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  redirectUrl: string;
  private jwtHelper = new JwtHelper();

  constructor(private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    return this.checkLogin(url);
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

  checkLogin(url: string): boolean {
    let token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.redirectUrl = url;
    this.router.navigateByUrl('/login');
    return false;
  }

}
