import { state, style, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('box', [
            state('start', style({ background: 'cyan' })),
            state(
                'end',
                style({ background: 'crimson', transform: 'scale(1.2)' }),
            ),
        ]),
    ],
})
export class AppComponent {
    boxState = 'start';

    animate() {
        this.boxState = this.boxState === 'start' ? 'end' : 'start';
    }
}
