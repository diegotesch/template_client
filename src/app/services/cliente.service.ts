import { environment } from './../../environments/environment.prod';
import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { Cliente } from './../models/cliente.model';

const api: string = `${environment.apiUrl}/dominios/clientes`;

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseResourceService<Cliente> {

  constructor(
      protected injector: Injector
  ) {
      super(api, injector, Cliente.fromJson);
  }
}
