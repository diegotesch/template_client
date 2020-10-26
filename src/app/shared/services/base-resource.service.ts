import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { BaseResourceModel } from './../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonToResourceFn: (json: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  obterTodos(): Observable<T[]> {
    return this.http.get(`${this.apiPath}`).pipe(
      map(this.jsonToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  obterPorId(id: number): Observable<T> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      map(this.jsonToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  submitSprintGenerico(resource: T): Observable<T> {
      if (!resource.id)
        return this.cadastrar(resource);
      return this.atualizar(resource);
  }

  cadastrar(resource: T): Observable<T> {
    return this.http.post(`${this.apiPath}`, resource).pipe(
      map(this.jsonToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  atualizar(resource: T): Observable<T> {
    return this.http.put(`${this.apiPath}`, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }


  protected jsonToResources(json: any[]): T[] {
    return json.map(element => this.jsonToResourceFn(element));
  }

  protected jsonToResource(json: any): T {
    return this.jsonToResourceFn(json);
  }

  protected handleError(error: any): Observable<any> {
    console.error("ERRO NA REQUISÇÂO => " ,error);
    return throwError(error);
  }
}
