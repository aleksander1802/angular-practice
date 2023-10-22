import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
    showIds = false;

    constructor(
        public postsService: PostsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.showIds = !!params['showIds'];
        });

        this.route.fragment.subscribe((fragmant) => {
            console.log(fragmant);
        });
    }

    showIdsProgram() {
        this.router.navigate(['/posts'], {
            queryParams: {
                showIds: true,
            },
            fragment: 'program-fragment',
        });
    }
}
