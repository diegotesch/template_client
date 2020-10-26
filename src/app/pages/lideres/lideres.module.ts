import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { LideresRoutingModule } from './lideres-routing.module';
import { LideresListComponent } from './lideres-list/lideres-list.component';
import { LideresFormComponent } from './lideres-form/lideres-form.component';


@NgModule({
  declarations: [LideresListComponent, LideresFormComponent],
  imports: [
    LideresRoutingModule,
    SharedModule
  ]
})
export class LideresModule { }
