import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    form!: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
            address: new FormGroup({
                country: new FormControl('ru'),
                city: new FormControl('', Validators.required),
            }),
        });
    }

    submit() {
        if (this.form.valid) {
            console.log('Form submited', this.form);
            const formData = { ...this.form.value };
            console.log('Form value', formData);
        }
    }

    setCapital() {
        const cityMap = {
            ru: 'Москва',
            by: 'Минск',
            ua: 'Киев',
        };

        const cityKey: keyof typeof cityMap = this.form
            .get('address')
            ?.get('country')?.value;
        const city = cityMap[cityKey];

        this.form.patchValue({
            address: { city },
        });
    }
}
