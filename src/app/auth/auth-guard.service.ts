import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {JwtHelper} from "angular2-jwt";
import {MemberVO} from "../domain/member.vo";
import {ResultVO} from "../domain/result.vo";
import {UserService} from "../user.service";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  redirectUrl: string;
  private jwtHelper = new JwtHelper();

  constructor(private router: Router, private userService: UserService,
              public afAuth: AngularFireAuth) {

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

  login(member: MemberVO) {
    this.userService.login(member)
      .then((res: ResultVO) => {
        if (res.result === 0) {
          // 로그인 성공. 서버에서 받은 토큰 정보를 스토리지에 저장.
          localStorage.setItem('token', res.data['token']);
          if (this.redirectUrl) {
            this.router.navigateByUrl(this.redirectUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        } else if (res.result === 100) { // email does not exist
          // 서버에 정보가 없으므로 회원추가 페이지로 이동.
          this.router.navigateByUrl('/register');
          localStorage.setItem('member', JSON.stringify(member));
        }
      });
  }

  logOut() {
    // 스토리지에 저장된 토큰 정보와 인증 정보를 삭제
    localStorage.removeItem('token');
    this.afAuth.auth.signOut();
    this.redirectUrl = null;
    this.router.navigateByUrl('/');
  }

}
