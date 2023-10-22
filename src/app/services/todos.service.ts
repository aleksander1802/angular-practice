import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, throwError } from 'rxjs';

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
            .pipe(
                delay(500),
                catchError((error) => {
                    console.log('Error:', error.message);

                    return throwError(() => new Error(error.message));
                }),
            );
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
        ).pipe(

            catchError((error) => {
                console.log('Error:', error.message);

                return throwError(() => new Error(error.message));
            }),
        );
    }
}
