import {Component, OnInit} from '@angular/core';
import {MemberVO} from "../../domain/member.vo";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVO();
  authState: Observable<firebase.User>;
  currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        // 로그인이 성공하면 호출
        this.currentUser = user;
        console.log(this.currentUser);
        // 소셜 로그인 성공후 서버에 인증 및 권한 획득
      } else {
        this.currentUser = null;
      }
    });
  }

  ngOnInit() {
  }

  signupWithPassword() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.member.email, this.member.pw)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  loginWithPassword() {
    this.afAuth.auth.signInWithEmailAndPassword(this.member.email, this.member.pw)
      .then(data => {
        console.log(data);
      });
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(data => {
        console.log('signInWithPopup', data);
      });
  }
}
