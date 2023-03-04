import { EquipmentCreateRequest } from "./equipmentCreateRequest";

export class EquipmentUpdateRequest extends EquipmentCreateRequest {
    id: number

    constructor(props: Partial<EquipmentUpdateRequest> = {}) {
        super(props)

        this.id = props.id || NaN;
    }
}
