import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { switchMap, finalize } from 'rxjs/operators';

import { BaseResourceModel } from './../models/base-resource.model';
import { BaseResourceService } from './../services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  acaoAtual: string;
  resourceForm: FormGroup;
  titulo: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  @BlockUI() blockUI: NgBlockUI;

  dataBr = {
    firstDayOfWeek: 1,
    dayNames: ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: 'Hoje',
    clear: 'Limpar'
};

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setAcaoAtual();
    this.iniciarForm();
    this.carregarResource();
  }

  //metodo invocado apos checar o carregamento de todo o conteudo
  ngAfterContentChecked() {
    this.setTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (!this.resourceForm.invalid) {
        if (this.acaoAtual == 'novo') {
            this.cadastrarResource();
            return;
          }
          this.atualizarResource();
    }

  }

  converterDropDown(jsonData: any, value: string = 'id', label:string = 'nome') {
      return jsonData.map(data => {
          return {
              label: data[label],
              value: data[value]
          }
      })
  }

  protected setAcaoAtual() {
    this.acaoAtual = this.route.snapshot.url[0].path == "novo" ? "novo" : "editar";
  }

  protected carregarResource() {
    if (this.acaoAtual == "editar") {
    this.blockUI.start();
      this.route.paramMap.pipe(
        // obtem o valor do id passado como parametro na rota e o usa para obter a categoria
        switchMap(params => this.resourceService.obterPorId(+params.get("id")))
      ).subscribe(resource => {
        this.resource = resource;
        // faz o bind da categoria com o formulario (carrega os dados no formulario)
        this.resourceForm.patchValue(this.resource);
        this.blockUI.stop();
      }, error => {
        alert('Ocorreu um erro no servidor, tente novamente mais tarde');
      })
    }
  }

  protected setTitle() {
    this.titulo = this.obterTituloCadastro();
    if (this.acaoAtual !== 'novo') {
      this.titulo = this.obterTituloEdicao();
    }
  }

  protected obterTituloCadastro(): string {
    return 'Novo';
  }

  protected obterTituloEdicao(): string {
    return 'Edição';
  }

  protected cadastrarResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.blockUI.start();
    this.resourceService.cadastrar(resource).pipe(
        finalize(() => this.blockUI.stop())
    ).subscribe(
      resource => this.actionForSuccess(resource),
      error => this.actionForError(error)
    )
  }

  protected atualizarResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.blockUI.start();
    this.resourceService.atualizar(resource).pipe(
        finalize(() => this.blockUI.stop())
    ).subscribe(
      resource => this.actionForSuccess(resource),
      error => this.actionForError(error)
    )
  }

  protected actionForSuccess(resource: T) {
    // inserir toast

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
      () => this.router.navigate([baseComponentPath, resource.id])
    )
  }

  protected actionForError(error) {
    // inserir toast

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
      return;
    }

    this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente novamente mais tarde'];
  }

  protected abstract iniciarForm(): void;

}
