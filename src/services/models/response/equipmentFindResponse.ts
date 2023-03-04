export interface EquipmentFindResponse {
    id: number;
    type: string;
    processorType: string;
    processorModel: string;
    ramMemoryCapacity: string;
    ramMemoryType: string;
    hardDriveCapacity_1: string;
    hardDriveType_1: string;
    hardDriveCapacity_2: null | string;
    hardDriveType_2: null | string;
    model: string;
    serial: string;
    licensePlate: null | string;
    monitorModel: null | string;
    dateOfPurchase: string;
    warrantyEndDate: string;
    monitorSerial: null | string;
    monitorLicensePlate: null | string;
    campus: string;
    area: string;
    user: string;
    cc: string;
    phone: null | string;
    createdAt: string;
    updatedAt: string;
    brandId: number;
    state: string;
    brand: BrandEquipmentFindResponse;
}

export interface BrandEquipmentFindResponse {
    id: number;
    name: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}
