import { BaseResourceModel } from './../shared/models/base-resource.model';

export class Cliente extends BaseResourceModel {
    constructor(
        public id?: number,
        public descricao?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): Cliente {
        return Object.assign(new Cliente(), jsonData);
    }
}
