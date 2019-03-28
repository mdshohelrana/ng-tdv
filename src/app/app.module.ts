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
import { AppRoutingModule } from './app-routing.module';


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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
