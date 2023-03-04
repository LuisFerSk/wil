import { IBlocEvent } from "bloc/blocUtils"
import { EquipmentFindResponse } from "services/models";

export class EquipmentFindBloc implements IBlocEvent { }

export class EquipmentFindBlocLoading extends EquipmentFindBloc { }

export class EquipmentFindBlocSuccess extends EquipmentFindBloc {
    state: EquipmentFindResponse;

    constructor(state: EquipmentFindResponse) {
        super();
        this.state = state;
    }
}

export class EquipmentFindBlocFailure extends EquipmentFindBloc {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}