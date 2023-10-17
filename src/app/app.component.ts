import { Component } from '@angular/core';

export interface Post {
    title: string;
    text: string;
    id?: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    posts: Post[] = [
        {
            id: 1,
            title: 'Angular components',
            text: "I'm still learning",
        },
        {
            id: 2,
            title: 'Next article',
            text: 'About directives and pipes',
        },
    ];

    updatePosts(post: Post) {
        this.posts.unshift(post);
    }
}
