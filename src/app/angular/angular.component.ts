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
  // 할일 추가를 위한 객체
  newTodo = new TodoVO();

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

  addTodo() {
    this.userService.addTodoList(this.newTodo)
      .then((data: TodoVO) => {
        this.todoList.unshift(data);
      });
  }

  update(item: TodoVO) {
    //item
  }
}
