export class PrinterScannerCreateRequest {
    type: string;
    campus: string;
    brand: string;
    model: string;
    serial: string;
    licensePlate?: null | string;
    area: string;
    state: string;
    owner?: null | string;
    acquiredBy: string;
    dateOfPurchaseOrRental: string;
    ip?: null | string;
    warrantyEndDate?: null | string;

    constructor(props: Partial<PrinterScannerCreateRequest> = {}) {
        this.type = props.type || ''
        this.campus = props.campus || ''
        this.brand = props.brand || ''
        this.model = props.model || ''
        this.serial = props.serial || ''
        this.licensePlate = props.licensePlate || undefined
        this.area = props.area || ''
        this.state = props.state || ''
        this.owner = props.owner || undefined
        this.acquiredBy = props.acquiredBy || ''
        this.dateOfPurchaseOrRental = props.dateOfPurchaseOrRental?.split('T')[0] || ''
        this.ip = props.ip || undefined
        this.warrantyEndDate = props.warrantyEndDate?.split('T')[0] || undefined
    }
}
