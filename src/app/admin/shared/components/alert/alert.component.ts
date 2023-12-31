import {
    Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService, AlertType } from '../../services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
    @Input() delay = 5000;

    public text!: string;

    public type: AlertType = 'success';

    aSub: Subscription = new Subscription();

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.aSub = this.alertService.alert$.subscribe((alert) => {
            this.text = alert.text;
            this.type = alert.type;

            const timeOut = setTimeout(() => {
                clearTimeout(timeOut);
                this.text = '';
            }, this.delay);
        });
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    }
}
