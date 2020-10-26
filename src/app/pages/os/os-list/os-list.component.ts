import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { tap, finalize } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { BaseResourceListComponent } from './../../../shared/components/base-resource-list.component';
import { OsService } from './../../../services/os.service';
import { ProjetoService } from './../../../services/projeto.service';
import { TipoSituacaoService } from './../../../services/tipo-situacao.service';
import { TipoSituacao } from './../../../models/tipo-situacao.model';
import { Projeto } from './../../../models/projeto.model';
import { Os } from './../../../models/os.model';


@Component({
  selector: 'app-os-list',
  templateUrl: './os-list.component.html',
  styleUrls: ['./os-list.component.css']
})
export class OsListComponent extends BaseResourceListComponent<Os> implements OnInit {

    @BlockUI() blockUI: NgBlockUI;

    colunas: any[] = [
        { header: 'Nome' },
        { header: 'Projeto' },
        { header: 'Situação' },
        { header: 'Data de Entrega' },
        { header: 'Ações' }
    ];

    listaSituacoes: TipoSituacao[] = [];
    listaProjetos: Projeto[] = [];

  constructor(
      protected osService: OsService,
      protected confirmService: ConfirmationService,
      protected messageService: MessageService,
      private projetoService: ProjetoService,
      private tipoSituacaoService: TipoSituacaoService
  ) {
      super(osService, confirmService, messageService);
  }

  ngOnInit(): void {
    this.obterSituacoes();
    this.obterProjetos();
    super.ngOnInit();
  }

  obterSituacoes() {
      this.blockUI.start();
      this.tipoSituacaoService.obterTodos().pipe(
        finalize(() => this.blockUI.stop())
      ).subscribe(
          situacoes => this.listaSituacoes = situacoes
      );
  }

  obterProjetos() {
      this.blockUI.start();
      this.projetoService.obterTodos().pipe(
          finalize(() => this.blockUI.stop())
      ).subscribe(
          projetos => this.listaProjetos = projetos
      );
  }

  selecionarProjeto(idProjeto: number): Projeto {
      return this.listaProjetos.find(projeto => projeto.id === idProjeto);
  }

  selecionarSituacao(idSituacao: number): TipoSituacao {
      return this.listaSituacoes.find(situacao => situacao.id === idSituacao);
  }

}
