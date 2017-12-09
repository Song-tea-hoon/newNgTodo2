import {Component, OnInit} from '@angular/core';
import {TodoVO} from '../domain/todo.vo';
import {UserService} from '../user.service';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit {

  todoList = new Array<TodoVO>();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    console.log('getTodoList');
    this.userService.getTodoList()
      .then((data: Array<TodoVO>) => {
        this.todoList = data;
        console.log(data);
      });
  }

  update(item: TodoVO) {
    //item
  }
}
