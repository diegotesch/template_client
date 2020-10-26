import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { OsRoutingModule } from './os-routing.module';
import { OsListComponent } from './os-list/os-list.component';
import { OsFormComponent } from './os-form/os-form.component';
import { SprintsModule } from './../sprints/sprints.module';

@NgModule({
  declarations: [OsListComponent, OsFormComponent],
  imports: [
    SharedModule,
    OsRoutingModule,
    SprintsModule
  ]
})
export class OsModule { }
