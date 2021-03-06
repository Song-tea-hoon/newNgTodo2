import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./index/index.component";
import {HomeComponent} from "./home/home.component";
import {JqueryComponent} from "./jquery/jquery.component";
import {AngularComponent} from "./angular/angular.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {NicknameComponent} from "./nickname/nickname.component";
import {RegisterComponent} from "./auth/register/register.component";

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'jquery', component: JqueryComponent},
      {path: 'angular', component: AngularComponent},
      {path: 'login', component: LoginComponent},
      {path: 'nickname', component: NicknameComponent, canActivate:[AuthGuardService]},
      {path: 'register', component: RegisterComponent},
    ]
  },

  // 참고: 향후 관리자 생성 모듈
  {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuardService]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
