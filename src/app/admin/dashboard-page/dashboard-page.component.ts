import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/form.interface';
import { Subscription } from 'rxjs';
import { PostsService } from '../shared/services/posts.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
    posts: Post[] = [];

    pSub: Subscription = new Subscription();

    searchPostValue = '';

    constructor(private postService: PostsService) {}

    ngOnInit() {
        return this.postService.getAll().subscribe((posts) => {
            this.posts = posts;
        });
    }

    remove(e: Event, id: string) {
        e.preventDefault();
        this.posts = this.posts.filter((post) => post.id !== id);
    }

    ngOnDestroy() {
        if (this.pSub) {
            this.pSub.unsubscribe();
        }
    }
}
