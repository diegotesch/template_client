import { BaseResourceModel } from './../shared/models/base-resource.model';

export class TipoSituacao extends BaseResourceModel {
    constructor(
        public id?: number,
        public descricao?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): TipoSituacao {
        return Object.assign(new TipoSituacao(), jsonData);
    }
}
