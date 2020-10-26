import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashLiderComponent } from './dash-lider/dash-lider.component';
import { DashboardDefaulComponent } from './dashboard-defaul/dashboard-defaul.component';

const routes: Routes = [
    { path: '', component: DashboardDefaulComponent },
    { path: 'secondary', component: DashLiderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
