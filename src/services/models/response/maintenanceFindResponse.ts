import { EquipmentFindResponse } from "./equipmentFindResponse";

export interface MaintenanceFindResponse {
    id: string;
    date: string;
    city: string;
    workstation: null | boolean;
    ignitionStation: null | boolean;
    operatingSystemBoot: null | boolean;
    HDD: null | boolean;
    cdRomDvd: null | boolean;
    display: null | boolean;
    mouse: null | boolean;
    keyboard: null | boolean;
    removeIndoorDust: null | boolean;
    checkInternalConnections: null | boolean;
    cleanKeyboard: null | boolean;
    cleanMonitor: null | boolean;
    cleanMouse: null | boolean;
    connectPowerPeripheralCables: null | boolean;
    closePcCleanCase: null | boolean;
    endIgnitionStation: null | boolean;
    endOperatingSystemBoot: null | boolean;
    endHdd: null | boolean;
    endCdRomDvd: null | boolean;
    endDisplay: null | boolean;
    endMouse: null | boolean;
    endKeyboard: null | boolean;
    errorDescription: null | string;
    endErrorDescription: null | string;
    checkAntiVirus: null | boolean;
    deletionTemporaryCookies: null | boolean;
    diskDefragmentation: null | boolean;
    equipmentDelivery: null | boolean;
    question_1: null | string;
    question_2: null | string;
    question_3: null | string;
    observations: null | string;
    signature: string;
    createdAt: string;
    updatedAt: string;
    equipmentId: number;
    userId: number;
    user: UserMaintenanceFindResponse;
    equipment: EquipmentFindResponse;
}

export interface UserMaintenanceFindResponse {
    id: number;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}
