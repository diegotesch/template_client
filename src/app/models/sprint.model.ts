import { BaseResourceModel } from './../shared/models/base-resource.model';

export class Sprint extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public idOrdemServico?: number,
        public impedimento?: boolean,
        public prazo?: boolean,
        public dataInicio?: any,
        public dataTermino?: any,
        public idStatus?: number,
        public pontosFuncao?: number
    ) {
        super();
        this.idStatus = 2;
        this.impedimento = false;
        this.prazo = true;
    }

    static fromJson(jsonData: any): Sprint {
        return Object.assign(new Sprint(), jsonData);
    }
}
