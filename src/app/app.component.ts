import { Component, OnInit } from '@angular/core';
import { Todo, TodosService } from './services/todos.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private todosService: TodosService) {}

    todos: Todo[] = [];

    todoTitle = '';

    loading = false;

    error = '';

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

        this.todosService.addTodo(newTodo).subscribe((todo) => {
            this.todos.push(todo);
            this.todoTitle = '';
        });
    }

    fetchTodos() {
        this.loading = true;
        this.todosService.fetchTodos().subscribe(
            (response) => {
                this.todos = response;
                this.loading = false;
            },
            (error) => {
                this.error = error.message;
            },
        );
    }

    removeTodo(id?: number) {
        this.todosService.removeTodo(id).subscribe(() => {
            this.todos = this.todos.filter((todo) => todo.id !== id);
        });
    }

    completeTodo(id?: number) {
        return this.todosService.completeTodo(id).subscribe(
            (todo) => {
                console.log(todo);
                this.todos.find((t) => t.id === todo.id)!.completed = true;
            },
            (error) => {
                this.error = error.message;
            },
        );
    }
}
