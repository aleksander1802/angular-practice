import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
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
            state(
                'special',
                style({
                    background: 'orange',
                    transform: 'scale(0.5)',
                    borderRadius: '50%',
                }),
            ),
            transition('start => end', animate(500)),
            transition('end => start', animate('800ms ease-in-out')),
            transition('special <=> *', [
                style({ background: 'green' }),
                animate(1000, style({ background: 'black' })),
                animate(750),
            ]),
        ]),
    ],
})
export class AppComponent {
    boxState = 'start';

    animate() {
        this.boxState = this.boxState === 'start' ? 'end' : 'start';
    }
}
