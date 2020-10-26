import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { Sprint } from './../models/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService extends BaseResourceService<Sprint> {

  constructor(
      protected injector: Injector
  ) {
      super('api/sprints', injector, Sprint.fromJson);
  }
}
