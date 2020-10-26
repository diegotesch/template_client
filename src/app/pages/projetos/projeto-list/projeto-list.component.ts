import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { BaseResourceListComponent } from './../../../shared/components/base-resource-list.component';
import { ProjetoService } from './../../../services/projeto.service';
import { ClienteService } from './../../../services/cliente.service';
import { Projeto } from './../../../models/projeto.model';
import { Cliente } from './../../../models/cliente.model';

@Component({
  selector: 'app-projeto-list',
  templateUrl: './projeto-list.component.html',
  styleUrls: ['./projeto-list.component.css']
})
export class ProjetoListComponent extends BaseResourceListComponent<Projeto> implements OnInit {

    colunas: any[] = [
        { header: 'Nome' },
        { header: 'Cliente' },
        { header: 'Ações' }
    ]

    clientes: Cliente[] = [];

  constructor(
      protected projetoService: ProjetoService,
      protected clienteService: ClienteService,
      protected confirmService: ConfirmationService,
      protected messageService: MessageService
  ) {
      super(projetoService, confirmService, messageService);
  }

  ngOnInit() {
    this.carregarClientes();
    super.ngOnInit();
  }

  carregarClientes() {
      this.blockUI.start();
    this.clienteService.obterTodos().pipe(
        finalize(() => this.blockUI.stop())
    )
    .subscribe(
        clientes => {
            this.clientes = clientes;
        },
        error => this.messageService.add(
            {severity: 'error', summary: 'Erro ao carregar clientes'}
        )
    );
  }

  obterNomeCliente(idCliente: number) {
      return this.clientes.find(cliente => cliente.id === idCliente).descricao;
  }

}
