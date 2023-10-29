import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    form!: FormGroup;

    isSubmited = false;

    message?: string;

    constructor(
        public authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['loginAgain']) {
                this.message = 'Ведите данные для входа';
            } else if (params['authFailed']) {
                this.message = 'Сессия истекла. Введите данные заново.';
            }
        });

        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.isSubmited = true;

        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password,
        };

        this.authService.login(user).subscribe(
            () => {
                this.form.reset();
                this.router.navigate(['/admin', 'dashboard']);
                this.isSubmited = false;
            },
            () => {
                this.isSubmited = false;
            },
        );
    }
}
