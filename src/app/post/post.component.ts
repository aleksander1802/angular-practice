import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post, PostsService } from '../posts.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
    post!: Post;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private postsService: PostsService,
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const postId = params['id'];
            const foundPost = this.postsService.getById(+postId);
            if (foundPost) {
                this.post = foundPost;
            } else {
                throw new Error('Posts not found');
            }
        });
    }

    loadPost() {
        this.router.navigate(['/posts', 44]);
    }
}
