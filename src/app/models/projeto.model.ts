import { BaseResourceModel } from './../shared/models/base-resource.model';

export class Projeto extends BaseResourceModel {
    constructor(
        public id?: number,
        public idCliente?: number,
        public nome?: string,
        public idLider?: number,
        public testador?: string,
        public revisor?: string,
        public gerente?: string,
        public link?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): Projeto {
        return Object.assign(new Projeto(), jsonData);
    }
}
