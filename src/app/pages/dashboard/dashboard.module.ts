import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashLiderComponent } from './dash-lider/dash-lider.component';
import { DashboardDefaulComponent } from './dashboard-defaul/dashboard-defaul.component';


@NgModule({
  declarations: [DashLiderComponent, DashboardDefaulComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
