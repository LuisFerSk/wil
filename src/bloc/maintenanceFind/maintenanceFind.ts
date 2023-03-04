import { IBlocEvent } from "bloc/blocUtils"
import { MaintenanceFindResponse } from "services/models";

export class MaintenanceFindBloc implements IBlocEvent { }

export class MaintenanceFindBlocLoading extends MaintenanceFindBloc { }

export class MaintenanceFindBlocSuccess extends MaintenanceFindBloc {
    state: MaintenanceFindResponse;

    constructor(state: MaintenanceFindResponse) {
        super();
        this.state = state;
    }
}

export class MaintenanceFindBlocFailure extends MaintenanceFindBloc {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}