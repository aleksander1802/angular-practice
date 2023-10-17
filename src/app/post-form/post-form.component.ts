import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../app.component';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
    @Output() addNewPost: EventEmitter<Post> = new EventEmitter<Post>();

    title = '';
    text = '';

    addPost() {
        if (this.text.trim() && this.text.trim()) {
            const post: Post = {
                title: this.title,
                text: this.text,
            };

            this.addNewPost.emit(post);
            this.title = this.text = '';
        }
    }
}
