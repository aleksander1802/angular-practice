import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../app.component';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(posts: Post[], search = '', field: keyof Post = 'title'): Post[] {
        if (!search.trim()) {
            return posts;
        }

        return posts.filter((post) => post[field].toLowerCase().includes(search.toLowerCase()));
    }
}
