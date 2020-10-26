import { environment } from './../../environments/environment.prod';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { Projeto } from './../models/projeto.model';

const api: string = `${environment.apiUrl}/projetos`;

@Injectable({
  providedIn: 'root'
})
export class ProjetoService extends BaseResourceService<Projeto> {

  constructor(
      protected injector: Injector
  ) {
      super(api, injector, Projeto.fromJson);
  }

  obterDetalhado(): Observable<any[]> {
    return this.http.get(`${this.apiPath}/detalhe`).pipe(
      map(this.jsonToResources.bind(this)),
      catchError(this.handleError)
    );
  }
}
