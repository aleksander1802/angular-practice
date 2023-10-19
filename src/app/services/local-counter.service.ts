import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalCounterService {
    counter = 0;

    increase() {
        this.counter += 1;
    }

    decrease() {
        this.counter -= 1;
    }
}
