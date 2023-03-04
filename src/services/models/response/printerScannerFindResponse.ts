export interface PrinterScannerFindResponse {
    id: number;
    type: string;
    model: string;
    serial: string;
    licensePlate: null | string;
    campus: string;
    area: string;
    owner: string;
    state: string;
    acquiredBy: string;
    ip: null | string;
    dateOfPurchaseOrRental: string;
    warrantyEndDate: null | string;
    createdAt: string;
    updatedAt: string;
    brandId: number;
    brand: BrandPrinterScannerFindResponse;
}

export interface BrandPrinterScannerFindResponse {
    id: number;
    name: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}
