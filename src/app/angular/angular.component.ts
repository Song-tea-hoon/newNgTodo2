import {Component, OnInit} from '@angular/core';
import {TodoVO} from '../domain/todo.vo';
import {UserService} from '../user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ResultFunc} from 'rxjs/observable/GenerateObservable';
import {ResultVO} from '../domain/result.vo';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('In', style({opacity: 1, transform: 'translate(0, 0)'})),
      transition('void => *', [
        style({transform: 'translate(-100%, 0)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translate(0, -100%)', opacity: '0'}))
      ])
    ])
  ]
})
export class AngularComponent implements OnInit {

  todoList = new Array<TodoVO>();
  // 할일추가를 하기 위한 객체
  newTodo = new TodoVO();

  tempTodoList = new Map<number, TodoVO>();

  constructor(private userService: UserService) {
  }

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
    this.userService.addTodo(this.newTodo)
      .then((res: TodoVO) => {
        this.todoList.unshift(res);
        // this.newTodo = new TodoVO();
      });
  }

  save(item: TodoVO) {
    item.isEdited = true;

    // const tempTodo = new TodoVO();
    // tempTodo.todo = item.todo;
    // tempTodo.created = item.created;
    // tempTodo.updated = item.updated;
    const tempTodo: TodoVO = {...item};
    this.tempTodoList.set(item.todo_id, tempTodo);
  }

  remove(item: TodoVO) {

    this.userService.deleteTodo(item.todo_id)
      .then((res: ResultVO) => {
        if (res.result === 0) {
          this.todoList.forEach((todo, index) => {
            if( item.todo_id === todo.todo_id ){
              this.todoList.splice(index, 1);
            }
          });
          // todoList.splice();
          alert(res.value);
        }
      });
  }

  modify(item: TodoVO) {
    console.log('modify');
    this.userService.modifyTodo(item)
      .then((res: TodoVO) => {
        item.todo = res.todo;
        item.updated = res.updated;
        item.isEdited = false;
      });
  }

  restore(item: TodoVO) {
    item.isEdited = false;
    const tempTodo = this.tempTodoList.get(item.todo_id);
    item.todo = tempTodo.todo;
    item.created = tempTodo.created;
    item.updated = tempTodo.updated;
  }
}
