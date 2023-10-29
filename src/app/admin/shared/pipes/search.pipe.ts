import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/form.interface';

@Pipe({
    name: 'searchPosts',
})
export class SearchPostsPipe implements PipeTransform {
    transform(posts: Post[], searchValue = '') {
        if (!searchValue.trim()) {
            return posts;
        }

        return posts.filter((post) => {
            const minLen = searchValue.toLowerCase().trim();
            return post.title.toLowerCase().includes(minLen);
        });
    }
}
