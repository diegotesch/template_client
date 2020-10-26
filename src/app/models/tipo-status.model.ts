import { BaseResourceModel } from './../shared/models/base-resource.model';

export class TipoStatus extends BaseResourceModel {
    constructor(
        public id?: number,
        public descricao?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): TipoStatus {
        return Object.assign(new TipoStatus(), jsonData);
    }
}
