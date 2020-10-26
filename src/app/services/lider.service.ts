import { environment } from './../../environments/environment.prod';
import { Injectable , Injector} from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { Lider } from './../models/lider.model';

const api: string = `${environment.apiUrl}/lideres`;

@Injectable({
  providedIn: 'root'
})
export class LiderService extends BaseResourceService<Lider> {

  constructor(
      protected injector: Injector
  ) {
      super(api, injector, Lider.fromJson);
  }
}
