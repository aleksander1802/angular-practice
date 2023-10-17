import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../app.component';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})
export class PostComponent {
    @Input() post: Post | undefined;
    @Output() removePostById = new EventEmitter<number>();

    removePost() {
        this.removePostById.emit(this.post?.id);
    }
}
