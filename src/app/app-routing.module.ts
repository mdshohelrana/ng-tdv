import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleFormComponent } from './examples/simple-form/simple-form.component';
import { MasterChildFormComponent } from './examples/master-child-form/master-child-form.component';


export const routes: Routes = [{
  path: '',
  redirectTo: '/simple-form',
  pathMatch: 'full'
},
{
  path: 'simple-form',
  component: SimpleFormComponent,
  data: { title: 'Simple Example', fileName: 'simple-form.component.ts', folderName: 'simple-form' }
},
{
  path: 'master-child-form',
  component: MasterChildFormComponent,
  data: { title: 'Master Child Example', fileName: 'simple-form.component.ts', folderName: 'master-child-form' }
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
