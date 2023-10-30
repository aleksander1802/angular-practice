import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces/form.interface';
import { PostsService } from '../shared/services/posts.service';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
    form!: FormGroup;

    post!: Post;

    isSubmitted = false;

    uSub!: Subscription;

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
                this.post = post;
                this.form = new FormGroup({
                    title: new FormControl(post.title, Validators.required),
                    text: new FormControl(post.text, Validators.required),
                });
            });
    }

    ngOnDestroy(): void {
        if (this.uSub) {
            this.uSub.unsubscribe();
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        this.uSub = this.postsService
            .update({
                ...this.post,
                text: this.form.value.text,
                title: this.form.value.title,
            })
            .subscribe(() => {
                this.isSubmitted = false;
            });
    }
}
