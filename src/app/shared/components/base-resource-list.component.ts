import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, Injector } from '@angular/core';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { finalize, tap } from 'rxjs/operators';

import { BaseResourceModel } from './../models/base-resource.model';
import { BaseResourceService } from './../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    protected resourceService: BaseResourceService<T>,
    protected confirmService: ConfirmationService,
    protected messageService: MessageService
  ) { }

  ngOnInit() {
    this.listarResources();
  }

  listarResources() {
    this.blockUI.start()
    this.resourceService.obterTodos().pipe(
        finalize(() => this.blockUI.stop())
    )
    .subscribe(
      resources => {
        this.resources = resources;
      },
      error => this.messageService.add({severity:'error', summary: 'Erro ao carregar a lista.'})
    );
  }

  deletarResource(resource: T) {
    this.deletar(resource.id)
  }

  formatarDataBr(data: any) {
    if (!data) {
        return '-';
    }

    if (data instanceof Date)
        return String(data).replace(/(\d{4})-(\d{2})-(\d{2})(.+)/, '$3/$2/$1');

    if (data.match(/(\d{4})-(\d{2})-(\d{2})/)) {
        return data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')
    }
  }

  private deletar(id: number) {
      this.blockUI.start()
      this.resourceService.deletar(id).pipe(
        finalize(() => this.blockUI.stop())
      ).subscribe(
          () => this.listarResources()
      )
  }

}
