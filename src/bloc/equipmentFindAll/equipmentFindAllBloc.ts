import { IBlocEvent } from "bloc/blocUtils"
import { EquipmentFindResponse } from "services/models";

export class EquipmentFindAllBloc implements IBlocEvent { }

export class EquipmentFindAllBlocLoading extends EquipmentFindAllBloc { }

export class EquipmentFindAllBlocSuccess extends EquipmentFindAllBloc {
    state: EquipmentFindResponse[];

    constructor(state: EquipmentFindResponse[]) {
        super();
        this.state = state;
    }
}

export class EquipmentFindAllBlocFailure extends EquipmentFindAllBloc {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}