export class MaintenanceCreateRequest {
    date: string;
    city: string;
    workstation?: null | string;
    ignitionStation?: null | boolean;
    operatingSystemBoot?: null | boolean;
    HDD?: null | boolean;
    cdRomDvd?: null | boolean;
    display?: null | boolean;
    mouse?: null | boolean;
    keyboard?: null | boolean;
    removeIndoorDust?: null | boolean;
    checkInternalConnections?: null | boolean;
    cleanKeyboard?: null | boolean;
    cleanMonitor?: null | boolean;
    cleanMouse?: null | boolean;
    connectPowerPeripheralCables?: null | boolean;
    closePcCleanCase?: null | boolean;
    endIgnitionStation?: null | boolean;
    endOperatingSystemBoot?: null | boolean;
    endHdd?: null | boolean;
    endCdRomDvd?: null | boolean;
    endDisplay?: null | boolean;
    endMouse?: null | boolean;
    endKeyboard?: null | boolean;
    errorDescription?: null | string;
    endErrorDescription?: null | string;
    checkAntiVirus?: null | boolean;
    deletionTemporaryCookies?: null | boolean;
    diskDefragmentation?: null | boolean;
    equipmentDelivery?: null | boolean;
    question_1?: null | string;
    question_2?: null | string;
    question_3?: null | string;
    observations?: null | string;
    signature: Blob;
    equipmentId: number;
    userId: number;

    constructor(props: Partial<MaintenanceCreateRequest> = {}) {
        this.date = props.date || ''
        this.city = props.city || ''
        this.workstation = props.workstation || ''
        this.ignitionStation = props.ignitionStation || false;
        this.operatingSystemBoot = props.operatingSystemBoot || false;
        this.HDD = props.HDD || false;
        this.cdRomDvd = props.cdRomDvd || false;
        this.display = props.display || false;
        this.mouse = props.mouse || false;
        this.keyboard = props.keyboard || false;
        this.removeIndoorDust = props.removeIndoorDust || false;
        this.checkInternalConnections = props.checkInternalConnections || false;
        this.cleanKeyboard = props.cleanKeyboard || false;
        this.cleanMonitor = props.cleanMonitor || false;
        this.cleanMouse = props.cleanMouse || false;
        this.connectPowerPeripheralCables = props.connectPowerPeripheralCables || false;
        this.closePcCleanCase = props.closePcCleanCase || false;
        this.endIgnitionStation = props.endIgnitionStation || false;
        this.endOperatingSystemBoot = props.endOperatingSystemBoot || false;
        this.endHdd = props.endHdd || false;
        this.endCdRomDvd = props.endCdRomDvd || false;
        this.endDisplay = props.endDisplay || false;
        this.endMouse = props.endMouse || false;
        this.endKeyboard = props.endKeyboard || false;
        this.errorDescription = props.errorDescription || ''
        this.endErrorDescription = props.endErrorDescription || ''
        this.checkAntiVirus = props.checkAntiVirus || false;
        this.deletionTemporaryCookies = props.deletionTemporaryCookies || false;
        this.diskDefragmentation = props.diskDefragmentation || false;
        this.equipmentDelivery = props.equipmentDelivery || false;
        this.question_1 = props.question_1 || ''
        this.question_2 = props.question_2 || ''
        this.question_3 = props.question_3 || ''
        this.observations = props.observations || ''
        this.signature = props.signature || new Blob()
        this.equipmentId = props.equipmentId || NaN;
        this.userId = props.userId || NaN;
    }
}
