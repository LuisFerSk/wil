export class EquipmentCreateRequest {
    type: string;
    processorType: string;
    processorModel: string;
    ramMemoryCapacity: string | number;
    ramMemoryType: string;
    hardDriveCapacity_1: string | number;
    hardDriveType_1: string;
    hardDriveCapacity_2?: null | string | number;
    hardDriveType_2?: null | string;
    model: string;
    serial: string;
    licensePlate?: null | string | number;
    monitorModel?: null | string;
    dateOfPurchase: string;
    warrantyEndDate: string;
    monitorSerial?: null | string;
    monitorLicensePlate?: null | string | number;
    campus: string;
    area: string;
    brand: string;
    user: string;
    cc: string | number;
    phone?: null | string | number;
    state: string

    constructor(props: Partial<EquipmentCreateRequest> = {}) {
        this.type = props.type || '';
        this.processorType = props.processorType || '';
        this.processorModel = props.processorModel || '';
        this.ramMemoryCapacity = props.ramMemoryCapacity || '';
        this.ramMemoryType = props.ramMemoryType || '';
        this.hardDriveCapacity_1 = props.hardDriveCapacity_1 || '';
        this.hardDriveType_1 = props.hardDriveType_1 || '';
        this.hardDriveCapacity_2 = props.hardDriveCapacity_2 || undefined;
        this.hardDriveType_2 = props.hardDriveType_2 || undefined;
        this.model = props.model || '';
        this.serial = props.serial || '';
        this.licensePlate = props.licensePlate || undefined;
        this.monitorModel = props.monitorModel || undefined;
        this.dateOfPurchase = props.dateOfPurchase?.split('T')[0] || '';
        this.warrantyEndDate = props.warrantyEndDate?.split('T')[0] || '';
        this.monitorSerial = props.monitorSerial || undefined;
        this.monitorLicensePlate = props.monitorLicensePlate || undefined;
        this.campus = props.campus || '';
        this.area = props.area || '';
        this.brand = props.brand || '';
        this.user = props.user || '';
        this.cc = props.cc || '';
        this.phone = props.phone || undefined;
        this.state = props.state || ''
    }
}
