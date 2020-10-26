import { environment } from './../../environments/environment.prod';
import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { TipoSituacao } from './../models/tipo-situacao.model';

const api: string = `${environment.apiUrl}/dominios/tipos-situacao`;

@Injectable({
  providedIn: 'root'
})
export class TipoSituacaoService extends BaseResourceService<TipoSituacao> {

  constructor(
      protected injector: Injector
  ) {
      super(api, injector, TipoSituacao.fromJson);
  }
}
