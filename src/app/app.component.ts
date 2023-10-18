import { Component } from '@angular/core';

export interface Post {
    title: string;
    text: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    search = '';

    searchFiled: keyof Post = 'title';

    posts: Post[] = [
        { title: 'Beer', text: 'Самое лучшее в мире' },
        { title: 'Bread', text: 'Самый лучший в мире хлеб' },
        { title: 'JavaScript', text: 'Самый лучший в мире язык' },
        { title: 'TypeScript', text: 'Самый лучший в мире язык типизации' },
    ];
}
