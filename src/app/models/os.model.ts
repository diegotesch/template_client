import { Sprint } from './sprint.model';
import { BaseResourceModel } from './../shared/models/base-resource.model';

export class Os extends BaseResourceModel {
    public sprints?: Sprint[];

    constructor(
        public id?: number,
        public nome?: string,
        public idProjeto?: number,
        public idSituacao?: number,
        public dataProximaEntrega?: any,
        public qtdDefeitosCliente?: number,
        public qtdDefeitosInterno?: number,
        public dataEntrega?: any,
        public qtdPontosFuncao?: number,
        public pontosFuncao?: number,
        public fabrica?: string
    ) {
        super();
        this.sprints = [];
    }

    static fromJson(jsonData: any): Os {
        return Object.assign(new Os(), jsonData);
    }
}
