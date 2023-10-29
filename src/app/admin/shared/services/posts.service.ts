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
                map((response: FirebaseCreateResponse) => ({
                    ...post,
                    id: response.name,
                    date: new Date(post.date),
                })),
            );
    }

    getAll(): Observable<Post[]> {
        return this.http
            .get<{ [key: string]: Post }>(
            `${environment.fireBaseDataBaseURL}/posts.json`,
        )
            .pipe(
                map((response) => Object.keys(response).map((key) => ({
                    ...response[key],
                    id: key,
                    date: new Date(response[key].date),
                }))),
            );
    }

    remove(id: string) {
        return this.http.delete(
            `${environment.fireBaseDataBaseURL}/posts/${id}.json`,
        );
    }
}
