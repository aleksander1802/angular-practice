import { FormControl } from '@angular/forms';

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
}
