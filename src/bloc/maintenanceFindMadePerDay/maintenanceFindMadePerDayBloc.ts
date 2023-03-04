import { IBlocEvent } from "bloc/blocUtils"
import { MaintenanceFindMadePerDayResponse } from "services/models";

export class MaintenanceFindMadePerDayBloc implements IBlocEvent { }

export class MaintenanceFindMadePerDayBlocLoading extends MaintenanceFindMadePerDayBloc { }

export class MaintenanceFindMadePerDayBlocInitial extends MaintenanceFindMadePerDayBloc { }

export class MaintenanceFindMadePerDayBlocSuccess extends MaintenanceFindMadePerDayBloc {
    state: MaintenanceFindMadePerDayResponse[];

    constructor(state: MaintenanceFindMadePerDayResponse[]) {
        super();
        this.state = state;
    }
}

export class MaintenanceFindMadePerDayBlocFailure extends MaintenanceFindMadePerDayBloc {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}