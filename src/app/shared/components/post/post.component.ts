import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/form.interface';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})
export class PostComponent {
    @Input() post!: Post;
}
