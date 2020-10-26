import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from './../../../shared/components/base-resource-form.component';
import { LiderService } from './../../../services/lider.service';
import { Lider } from './../../../models/lider.model';

@Component({
  selector: 'app-lideres-form',
  templateUrl: './lideres-form.component.html',
  styleUrls: ['./lideres-form.component.css']
})
export class LideresFormComponent extends BaseResourceFormComponent<Lider> {

  constructor(
      protected liderService: LiderService,
      protected injector: Injector
  ) {
      super(
          injector,
          new Lider(),
          liderService,
          Lider.fromJson
      )
  }

  protected iniciarForm() {
      this.resourceForm = this.formBuilder.group({
        id: [null],
        nome: [null, [Validators.required]],
        contato: [null]
      })
  }

  protected obterTituloCadastro(): string {
    return 'Cadastrar Líder';
  }

  protected obterTituloEdicao(): string {
    const nomeLider = this.resource.nome || '';
    return `Editando líder: ${nomeLider}`;
  }

}
