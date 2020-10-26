import { BaseResourceModel } from './../shared/models/base-resource.model';

export class Lider extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public contato?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): Lider {
        return Object.assign(new Lider(), jsonData);
    }
}
