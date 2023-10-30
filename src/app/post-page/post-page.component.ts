import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PostsService } from '../admin/shared/services/posts.service';
import { Post } from '../shared/interfaces/form.interface';

@Component({
    selector: 'app-post-page',
    templateUrl: './post-page.component.html',
    styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
    post$: Observable<Post> = new Observable();

    constructor(
        private route: ActivatedRoute,
        private postsService: PostsService,
    ) {}

    ngOnInit() {
        this.post$ = this.route.params.pipe(
            switchMap((params: Params) => this.postsService.getById(params['id'])),
        );
    }
}
