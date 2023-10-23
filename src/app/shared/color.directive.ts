import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appColor]',
})
export class ColorDirective {
    @HostBinding('style.color') color = '#aaa';
}
