import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

export interface Todo {
    title: string;
    completed: boolean;
    id?: number;
}

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    constructor(private http: HttpClient) {}

    addTodo(todo: Todo) {
        return this.http.post<Todo>(
            'https://jsonplaceholder.typicode.com/todos',
            todo,
        );
    }

    fetchTodos() {
        return this.http
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
            .pipe(delay(500));
    }

    removeTodo(id?: number) {
        return this.http.delete(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
        );
    }

    completeTodo(id?: number) {
        return this.http.put<Todo>(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
            { completed: true },
        );
    }
}
