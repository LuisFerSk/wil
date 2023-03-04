import { IBlocEvent } from "bloc/blocUtils"
import { MaintenanceFindResponse } from "services/models";

export class MaintenanceFindAllBloc implements IBlocEvent { }

export class MaintenanceFindAllBlocLoading extends MaintenanceFindAllBloc { }

export class MaintenanceFindAllBlocSuccess extends MaintenanceFindAllBloc {
    state: MaintenanceFindResponse[];

    constructor(state: MaintenanceFindResponse[]) {
        super();
        this.state = state;
    }
}

export class MaintenanceFindAllBlocFailure extends MaintenanceFindAllBloc {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}