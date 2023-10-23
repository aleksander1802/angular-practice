import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { RefDirective } from './ref.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(RefDirective) refDir!: RefDirective;

    showModal() {
        const component = this.refDir.containerRef.createComponent(ModalComponent);

        component.instance.title = 'Dynamic title';
        component.instance.closeModal.subscribe(() => {
            this.refDir.containerRef.clear();
        });
    }
}
