import { Component, OnInit } from '@angular/core';
import {TodoVO} from "../domain/todo.vo";
import {UserService} from "../user.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {ResultVO} from "../domain/result.vo";

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translate(0, 0)'})),
      state('active', style({opacity: 1, transform: 'scale(1, 1.3)'})),
      transition('void => in', [
        style({transform: 'translate(-100%, 0)'}),
        animate(300)
      ]),
      /*transition('* => void', [
        animate(300, style({transform: 'translate(0, -100%)', opacity: '0'}))
      ])*/
      transition('in => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-50px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ]),
      transition('void => active', [
        animate(600, keyframes([
          style({transform: 'scale(1, 1)',     offset: 0}),
          style({transform: 'scale(1, 1)',     offset: 0.5}),
          style({transform: 'scale(1, 1.3)',  offset: 1.0})
        ]))
      ]),

    ])
  ]
})
export class AngularComponent implements OnInit {

  todoList = new Array<TodoVO>();
  // 할일추가를 하기 위한 객체
  newTodo = new TodoVO();

  tempTodoList = new Map<number, TodoVO>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.userService.getTodoList()
      .then((res: Array<TodoVO>) => {
        this.todoList = res;
        console.log(this.todoList);
      });
  }

  addTodo() {
    console.log('addTodo');
    this.userService.addTodo(this.newTodo)
      .then((res: TodoVO) => {
        this.todoList.unshift(res);
        // this.newTodo = new TodoVO();
      });
  }

  save(item: TodoVO) {
    item.isEdited = true;
    // 기존값을 저장
    const tempTodo = new TodoVO();
    tempTodo.todo = item.todo;
    tempTodo.created = item.created;
    tempTodo.updated = item.updated;

    this.tempTodoList.set(item.todo_id, tempTodo);
  }

  restore(item: TodoVO) {
    item.isEdited = false;
    // 기존값을 복원
    const tempTodo = this.tempTodoList.get(item.todo_id);
    item.todo = tempTodo.todo;
    item.created = tempTodo.created;
    item.updated = tempTodo.updated;
  }

  modify(item: TodoVO) {
    this.userService.modifyTodo(item)
      .then((res: TodoVO) => {
        item.todo = res.todo;
        item.updated = res.updated;
        item.isEdited = false;
      });
  }

  remove(item: TodoVO) {
    this.userService.deleteTodo(item.todo_id)
      .then((res: ResultVO) => {
        if (res.result === 0) {
          // todoList에서 해당 todo_id 객체를 삭제
          this.todoList.forEach((todo, index) => {
            if (todo.todo_id === item.todo_id) {
              this.todoList.splice(index, 1);
            }
          });
          // alert(res.value);
        }
      });
  }
}
