import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
        const headers = new HttpHeaders({
            MyCustomHeader: Math.random().toString(),
        });
        return this.http.post<Todo>(
            'https://jsonplaceholder.typicode.com/todos',
            todo,
            {
                headers,
            },
        );
    }

    fetchTodos() {
        let params = new HttpParams();
        params = params.append('_limit', '4');
        return this.http
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
            params,
        })
            .pipe(
                delay(500),
                catchError((error) => throwError(() => new Error(error.message))),
            );
    }

    removeTodo(id?: number) {
        return this.http.delete(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
        );
    }

    completeTodo(id?: number) {
        return this.http
            .put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            completed: true,
        })
            .pipe(
                catchError((error) => throwError(() => new Error(error.message))),
            );
    }
}
