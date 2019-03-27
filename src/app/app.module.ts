import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PrismModule } from '@ngx-prism/core';

import { AppComponent } from './app.component';
import { LayoutHeaderComponent } from './layout/header.component';
import { LayoutSidenavComponent } from './layout/sidenav-component';
import { SimpleFormComponent } from './examples/simple-form/simple-form.component';
import { MasterChildFormComponent } from './examples/master-child-form/master-child-form.component';
import { NgTdvDirective, NgTdvClickDirective } from 'projects/ng-tdv/src/public-api';

export const appRoutes: Routes = [
  {
      path: '',
      redirectTo: '/simple-form',
      pathMatch: 'full'
  },
  { path: 'simple-form', component: SimpleFormComponent, data: { title: 'Simple Example', fileName: 'simple-form.component.ts', folderName:'simple-form' } },
  { path: 'master-child-form', component: MasterChildFormComponent, data: { title: 'Master Child Example', fileName: 'simple-form.component.ts', folderName:'master-child-form' } },
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutHeaderComponent,
    LayoutSidenavComponent,
    SimpleFormComponent,
    MasterChildFormComponent,
    NgTdvDirective,
    NgTdvClickDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PrismModule,
    RouterModule.forRoot(
      appRoutes,
      {
          useHash: true
      }
  )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
