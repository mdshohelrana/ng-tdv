import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrismModule } from '@ngx-prism/core';
import { AppComponent } from './app.component';
import { LayoutHeaderComponent } from './layout/header.component';
import { LayoutSidenavComponent } from './layout/sidenav-component';
import { NgTdvModule } from 'projects/ng-tdv/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { SimpleFormComponent } from './examples/simple-form/simple-form.component';
import { MasterChildFormComponent } from './examples/master-child-form/master-child-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutHeaderComponent,
    LayoutSidenavComponent,
    SimpleFormComponent,
    MasterChildFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PrismModule,
    AppRoutingModule,
    NgTdvModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
