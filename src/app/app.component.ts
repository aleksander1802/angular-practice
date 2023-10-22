import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';

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

    loading = false;

    ngOnInit() {
        this.fetchTodos();
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

    fetchTodos() {
        this.loading = true;
        this.http
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
            .pipe(delay(1500))
            .subscribe((response) => {
                this.todos = response;
                this.loading = false;
            });
    }

    removeTodo(id?: number) {
        this.http
            .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .subscribe((response) => {
                console.log(response);
                this.todos = this.todos.filter((todo) => todo.id !== id);
            });
    }
}
