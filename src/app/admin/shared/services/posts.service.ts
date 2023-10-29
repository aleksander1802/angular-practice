import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces/form.interface';
import { FirebaseCreateResponse } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient) {}

    create(post: Post): Observable<Post> {
        return this.http
            .post(`${environment.fireBaseDataBaseURL}/posts.json`, post)
            .pipe(
                map((response: FirebaseCreateResponse) => {
                    return {
                        ...post,
                        id: response.name,
                        date: new Date(post.date),
                    };
                }),
            );
    }
}
