import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { environment } from './../../environments/environment.prod';
import { Os } from './../models/os.model';

const api: string = `${environment.apiUrl}/ordens-servico`;

@Injectable({
  providedIn: 'root'
})
export class OsService extends BaseResourceService<Os> {

  constructor(
      protected injector: Injector
  ) {
      super(api, injector, Os.fromJson);
  }

  obterPorProjeto(idProjeto: number): Observable<Os[]> {
      return this.http.get(`${api}/${idProjeto}/projeto`).pipe(
        map(this.jsonToResources.bind(this)),
        catchError(this.handleError)
      )
  }

}
