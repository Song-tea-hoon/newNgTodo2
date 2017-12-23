import { Component, OnInit } from '@angular/core';
import {MemberVO} from "../../domain/member.vo";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  member = new MemberVO();
  constructor() { }

  ngOnInit() {
  }

}
