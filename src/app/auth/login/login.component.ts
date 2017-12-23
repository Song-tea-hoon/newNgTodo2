import { Component, OnInit } from '@angular/core';
import {MemberVO} from "../../domain/member.vo";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVO();

  constructor() { }

  ngOnInit() {
  }

  signupWithPassword() {

  }

  loginWithPassword() {

  }

  loginWithGoogle() {

  }
}
