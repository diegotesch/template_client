import { SituacaoEnum } from './../../../models/enums/situacao.enum.model';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Observable, forkJoin } from 'rxjs';
import { tap, finalize, map } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { OsService } from './../../../services/os.service';
import { ProjetoService } from './../../../services/projeto.service';
import { TipoSituacaoService } from './../../../services/tipo-situacao.service';
import { LiderService } from './../../../services/lider.service';
import { ClienteService } from './../../../services/cliente.service';
import { TipoStatusService } from './../../../services/tipo-status.service';

import { TipoSituacao } from './../../../models/tipo-situacao.model';
import { TipoStatus } from './../../../models/tipo-status.model';
import { Projeto } from './../../../models/projeto.model';
import { Os } from './../../../models/os.model';
import { Lider } from './../../../models/lider.model';
import { Cliente } from './../../../models/cliente.model';
import { ListaEnum } from './../../../models/enums/lista.enum.model';


@Component({
  selector: 'app-dash-lider',
  templateUrl: './dash-lider.component.html',
  styleUrls: ['./dash-lider.component.css']
})
export class DashLiderComponent implements OnInit, AfterContentChecked {

    @BlockUI() blockUI: NgBlockUI;

    listaLideres: Lider[] = [];
    lideresSelecionados: any = [];
    situacoes: TipoSituacao[] = [];
    lista$: Observable<any>;
    lista: any = [];
    listaFiltrada: any = [];
    listaAgrupada: any;
    osSelecionada: number = null;
    listaEnum = ListaEnum;

    colunas: any[] = [
        { header: '' },
        { header: 'OS' },
        { header: 'Status da OS' },
        { header: 'PF em execução?', reduzir: true},
        { header: 'Próxima Entrega?'},
        { header: 'A OS/Sprint está no prazo?'},
        { header: 'Defeito de Cliente?', reduzir: true},
        { header: 'Defeitos Internos?', reduzir: true},
        { header: 'Impedimento?'},
        { header: 'Revisor de Código?'},
        { header: 'Gerente?'},
        { header: 'Testador?'},
        { header: 'Ações'},
    ];

  constructor(
      protected osService: OsService,
      protected projetosService: ProjetoService,
      protected situacaoService: TipoSituacaoService,
      protected liderService: LiderService,
      protected clienteService: ClienteService,
      protected statusService: TipoStatusService
  ) { }

  ngOnInit(): void {
    this.obterLideres();
    this.obterSituacoes();
    this.obterLitaCompleta();
  }

  ngAfterContentChecked() {
  }

  obterLideres() {
      this.blockUI.start();
      this.liderService.obterTodos().pipe(
          finalize(() => this.blockUI.stop())
      ).subscribe(res => this.listaLideres = res);
  }

  obterSituacoes() {
    this.blockUI.start();
    this.situacaoService.obterTodos().pipe(
        finalize(() => this.blockUI.stop())
    ).subscribe(res => this.situacoes = res);
}

  obterLitaCompleta() {
    this.blockUI.start();

    forkJoin(
        this.osService.obterTodos(),
        this.projetosService.obterTodos(),
        this.clienteService.obterTodos(),
        this.situacaoService.obterTodos(),
        this.statusService.obterTodos(),
    ).pipe(
        tap(console.log),
        map(this.montarListagem),
        finalize(() => this.blockUI.stop())
    ).subscribe(res => {
        this.lista = res;
        this.listaFiltrada = res;
        console.log(this.lista);
    });
  }

  montarListagem(array) {
    let retorno = [];
    retorno = array[ListaEnum.OS].map((item, index, full) => {
        item['projeto'] = array[ListaEnum.PROJETO].find(projeto => projeto.id === item.idProjeto);
        item['cliente'] = array[ListaEnum.CLIENTE].find(cliente => cliente.id === item.projeto.idCliente).descricao;
        item['situacao'] = array[ListaEnum.SITUACAO].find(situacao => situacao.id === item.idSituacao).descricao;
        item.dataProximaEntrega = new Date(item.dataProximaEntrega);

        if (!full[index-1] || full[index-1].idProjeto !== item.idProjeto) {
            item['rowspan'] = { indice: index, size: array[ListaEnum.OS].filter(os => os.idProjeto === item.idProjeto).length };
        }
        return item
    });
    return retorno;
  }

  checarPrazo(os) {
    return os.sprints.some(sprint => !sprint.prazo) ? 'NÃO' : 'SIM';
  }

  checarImpedimento(os) {
      return os.sprints.some(sprint => !sprint.impedimento) ? 'NÃO' : 'SIM';
  }

  obterNomeSituacao(id: number) {
    return this.situacoes.find(situacao => situacao.id === id).descricao;
  }

  getRowspan(indice, data, array, check = false) {
    const info = this.filtrarOsPorProjeto(data.id, array)
      if (check)
        return info.length > 1 ? true : false;

      return this.filtrarOsPorProjeto(data.id, array).length;
  }


  filtrarPorLider() {
      if (!this.lideresSelecionados)
        this.listaFiltrada = this.lista.map(item => item);

     this.listaFiltrada = this.lista.filter(item => {
          return this.lideresSelecionados.some(lider => lider == item.projeto.idLider);
      })
  }

  filtrarClientePorId(idCliente: number, clientes: Cliente[]): Cliente {
      return clientes.find(cliente => cliente.id == idCliente);
  }

  filtrarOsPorProjeto(idProjeto: number, array) {
      return array.filter(os => os.idProjeto == idProjeto);
  }

  filtrarSituacao(idSituacao: number) {
    return this.situacoes.find(situacao => situacao.id == idSituacao).descricao;
}

  private converterDropDown(array, label:string = 'nome', value: string = null) {
    return array.map(data => {
        let valor = data;
      if (value) {
        valor = data[value]
      }
        return {
            label: data[label],
            value: valor
        }
    })
    }

    formatarData(data) {
        let nova = data.split('-');
        return `${nova[2]}/${nova[1]}/${nova[0]}`;
    }
}
