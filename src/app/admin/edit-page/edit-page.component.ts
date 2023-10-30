import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces/form.interface';
import { PostsService } from '../shared/services/posts.service';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private postsService: PostsService,
    ) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                switchMap((params: Params) => this.postsService.getById(params['id'])),
            )
            .subscribe((post: Post) => {
                this.form = new FormGroup({
                    title: new FormControl(post.title, Validators.required),
                    text: new FormControl(post.text, Validators.required),
                });
            });
    }

    onSubmit() {}
}
