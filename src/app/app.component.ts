import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Todo {
    title: string;
    completed: boolean;
    id?: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private http: HttpClient) {}

    todos: Todo[] = [];

    todoTitle = '';

    ngOnInit() {
        this.http
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
            .subscribe((response) => {
                this.todos = response;
            });
    }

    addTodo() {
        if (!this.todoTitle.trim()) {
            return;
        }

        const newTodo: Todo = {
            title: this.todoTitle,
            completed: false,
        };

        this.http
            .post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
            .subscribe((response) => {
                this.todos.push(response);
                this.todoTitle = '';
            });
    }
}
