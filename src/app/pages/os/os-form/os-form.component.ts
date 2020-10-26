import { Component, Injector, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';

import { SelectItem, MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';

import { BaseResourceFormComponent } from './../../../shared/components/base-resource-form.component';
import { SprintFormComponent } from './../../sprints/sprint-form/sprint-form.component';

import { OsService } from './../../../services/os.service';
import { ProjetoService } from './../../../services/projeto.service';
import { TipoSituacaoService } from './../../../services/tipo-situacao.service';
import { SprintService } from './../../../services/sprint.service';
import { TipoSituacao } from './../../../models/tipo-situacao.model';
import { Projeto } from './../../../models/projeto.model';
import { Os } from './../../../models/os.model';
import { Sprint } from './../../../models/sprint.model';

@Component({
  selector: 'app-os-form',
  templateUrl: './os-form.component.html',
  styleUrls: ['./os-form.component.css']
})
export class OsFormComponent extends BaseResourceFormComponent<Os> implements OnInit {

    projetos: SelectItem[] = [];
    situacoes: SelectItem[] = [];
    @ViewChild('dialogSprint') dialogSprint: SprintFormComponent;

    colunas: any = [
        { header: 'Sprint' },
        { header: 'idStatus' },
        { header: 'Pontos de Função' },
        { header: 'Ações' },
    ];

  constructor(
      private sprintService: SprintService,
      private projetoService: ProjetoService,
      private situacaoService: TipoSituacaoService,
      private messageService: MessageService,
      protected osService: OsService,
      protected injector: Injector
  ) {
      super(
          injector,
          new Os(),
          osService,
          Os.fromJson
      )
  }

  ngOnInit(): void {
      this.carregarProjetos();
      this.carregarSituacoes();
      super.ngOnInit();
  }

  mostrarDialogSprint(id?: number) {
    this.dialogSprint.openDialog(id);
  }

  deletarSprint(sprint: Sprint) {
      this.sprintService.deletar(sprint.id).subscribe(
          () => this.resource.sprints = this.resource.sprints.filter(res => res.id !== sprint.id)
      )
  }

  modificarSprint(event) {
      if (!event.id) {
            this.resource.sprints.push(event);
          return;
      }
      this.resource.sprints = this.resource.sprints.filter(sprint => sprint.id != event.id).concat(event);
  }

  salvarOs() {
    this.resourceForm.get('sprints').setValue(this.resource.sprints);
    this.submitForm();
  }

  protected iniciarForm() {
    this.resourceForm = this.formBuilder.group({
        id: [null],
        nome: [null, [Validators.required, Validators.minLength(2)]],
        idProjeto: [null, [Validators.required]],
        idSituacao: [null, [Validators.required]],
        dataProximaEntrega: [null,[Validators.required]],
        pontosFuncao: [null, [Validators.required]],
        fabrica: [null],
        sprints: [null]
    })
  }

  protected obterTituloCadastro(): string {
    return 'Cadastrar Ordem de Serviço';
  }

  protected obterTituloEdicao(): string {
    const nomeOs = this.resource.nome || '';
    return `Editar OS: ${nomeOs}`;
  }

  protected carregarResource() {
    if (this.acaoAtual == "editar") {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.obterPorId(+params.get("id")))
      ).subscribe(resource => {
        this.resource = resource;
        this.resource.dataEntrega = new Date(this.resource.dataEntrega);
        this.resource.dataProximaEntrega = new Date(this.resource.dataProximaEntrega);
        this.resourceForm.patchValue(this.resource);
      }, error => {
        this.messageService.add(
            {severity: 'error', summary: 'Ocorreu um erro no servidor, tente novamente mais tarde'}
        );
      })
    }
  }

  private carregarProjetos() {
    this.projetoService.obterTodos().subscribe(
        projetos => {
            this.projetos = this.converterDropDown(projetos,  'id', 'nome');
        },
        error => this.messageService.add(
            {severity: 'error', summary: 'Erro ao carregar projetos'}
        )
    );
  }

  private carregarSituacoes() {
    this.situacaoService.obterTodos().subscribe(
        situacoes => {
            this.situacoes = this.converterDropDown(situacoes,  'id', 'descricao');
        },
        error => this.messageService.add(
            {severity: 'error', summary: 'Erro ao carregar situações'}
        )
    );
  }
}
