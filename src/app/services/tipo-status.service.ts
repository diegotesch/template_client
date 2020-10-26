import { environment } from './../../environments/environment.prod';
import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { TipoStatus } from './../models/tipo-status.model';

const api: string = `${environment.apiUrl}/dominios/tipos-status`;

@Injectable({
  providedIn: 'root'
})
export class TipoStatusService extends BaseResourceService<TipoStatus> {

  constructor(
      protected injector: Injector
  ) {
      super(api, injector, TipoStatus.fromJson);
  }
}
