import {
    animate,
    group,
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
            transition(':enter', [
                style({ opacity: 0 }),
                animate('850ms ease-out'),
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                group([
                    animate(
                        750,
                        style({
                            opacity: 0,
                            transform: 'scale(1.2)',
                        }),
                    ),
                    animate(
                        300,
                        style({
                            color: '#000',
                            fontWeight: 'bold',
                        }),
                    ),
                ]),
            ]),
        ]),
    ],
})
export class AppComponent {
    boxState = 'start';

    visible = true;

    animate() {
        this.boxState = this.boxState === 'start' ? 'end' : 'start';
    }
}
