import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from '../admin/shared/services/posts.service';
import { Post } from '../shared/interfaces/form.interface';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    posts$: Observable<Post[]> = new Observable();

    constructor(private postsService: PostsService) {}

    ngOnInit() {
        this.posts$ = this.postsService.getAll();
    }
}
