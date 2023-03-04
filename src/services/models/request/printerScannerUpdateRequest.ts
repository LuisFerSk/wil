import { PrinterScannerCreateRequest } from "./printerScannerCreateRequest";

export class PrinterScannerUpdateRequest extends PrinterScannerCreateRequest {
    id: number

    constructor(props: Partial<PrinterScannerUpdateRequest> = {}) {
        super(props)

        this.id = props.id || NaN;
    }
}
