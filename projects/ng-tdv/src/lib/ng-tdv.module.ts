import { NgModule } from '@angular/core';
import { NgTdvComponent } from './ng-tdv.component';
import { NgTdvDirective } from './ng-tdv.directive';
import { NgTdvClickDirective } from './ng-tdv-click.directive';

@NgModule({
  declarations: [NgTdvComponent, NgTdvDirective, NgTdvClickDirective],
  imports: [
  ],
  exports: [NgTdvComponent, NgTdvDirective, NgTdvClickDirective]
})
export class NgTdvModule { }
