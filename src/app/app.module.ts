import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { RefDirective } from './ref.directive';

@NgModule({
    declarations: [AppComponent, ModalComponent, RefDirective],
    imports: [BrowserModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
