import {
    AbstractControl,
    AsyncValidatorFn,
    FormControl,
    ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

export class MyValidators {
    static restrictedEmail(
        control: FormControl,
    ): { [index: string]: boolean } | null {
        if (['v@mail.ru', 'test@mail.ru'].includes(control.value)) {
            return {
                restrictedEmail: true,
            };
        }

        return null;
    }

    static uniqueEmail(): AsyncValidatorFn {
        return (
            control: AbstractControl,
        ):
        | Promise<ValidationErrors | null>
        | Observable<ValidationErrors | null> => new Promise((resolve) => {
            setTimeout(() => {
                if (control.value === 'async@mail.ru') {
                    resolve({ uniqueEmail: true });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }
}
