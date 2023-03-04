import { IBlocEvent } from "bloc/blocUtils"
import { SupportFindResponse } from "services/models";

export class SupportFindAllBloc implements IBlocEvent { }

export class SupportFindAllBlocLoading extends SupportFindAllBloc { }

export class SupportFindAllBlocInitial extends SupportFindAllBloc { }

export class SupportFindAllBlocSuccess extends SupportFindAllBloc {
    state: SupportFindResponse[];

    constructor(state: SupportFindResponse[]) {
        super();
        this.state = state;
    }
}

export class SupportFindAllBlocFailure extends SupportFindAllBloc {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}