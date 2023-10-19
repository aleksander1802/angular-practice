import { Injectable } from '@angular/core';

@Injectable()
export class AppCounterService {
    counter = 0;

    increase() {
        this.counter += 1;
    }

    decrease() {
        this.counter -= 1;
    }
}