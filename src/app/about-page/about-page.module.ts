import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page.component';
import { AboutExtraPageComponent } from './about-extra-page/about-extra-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AboutPageComponent, AboutExtraPageComponent],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: 'about',
                component: AboutPageComponent,
                children: [
                    { path: 'extra', component: AboutExtraPageComponent },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AboutPageModule {}
