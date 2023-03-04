import { IBlocEvent } from "bloc/blocUtils"
import { BrandFindAllResponse } from "services/models";

export class BrandFindAllBloc implements IBlocEvent { }

export class BrandFindAllBlocLoading extends BrandFindAllBloc { }

export class BrandFindAllBlocInitial extends BrandFindAllBloc { }

export class BrandFindAllBlocSuccess extends BrandFindAllBloc {
    state: BrandFindAllResponse[];

    constructor(state: BrandFindAllResponse[]) {
        super();
        this.state = state;
    }
}

export class BrandFindAllBlocFailure extends BrandFindAllBloc {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}