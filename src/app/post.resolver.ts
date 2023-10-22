import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, delay, of } from 'rxjs';
import { Post, PostsService } from './posts.service';

@Injectable({
    providedIn: 'root',
})
export class PostResolver {
    constructor(private postsService: PostsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<Post> | Promise<Post> | Post {
        return of(this.postsService.getById(+route.params['id'])!).pipe(
            delay(1500),
        );
    }
}
