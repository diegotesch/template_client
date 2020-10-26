import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LideresFormComponent } from './lideres-form/lideres-form.component';
import { LideresListComponent } from './lideres-list/lideres-list.component';

const routes: Routes = [
    { path: '', component: LideresListComponent },
    { path: 'novo', component: LideresFormComponent },
    { path: ':id', component: LideresFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LideresRoutingModule { }
