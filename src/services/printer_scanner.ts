import axios from "axios";

import { postToken } from "services";
import { PrinterScannerCreateRequest, PrinterScannerFindResponse, PrinterScannerUpdateRequest } from "./models";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/printer_scanner`

export function printerScannerFindAll(token: string) {
    return axios.get<PrinterScannerFindResponse[]>(`${baseUrl}/find-all`, postToken(token))
}

export function printerScannerFind(token: string, id: string) {
    return axios.get<PrinterScannerFindResponse>(`${baseUrl}/find/${id}`, postToken(token))
}

export function printerScannerDestroy(token: string, id: number) {
    const config = {
        data: { id }
    }
    return axios.delete<string>(`${baseUrl}/destroy`, postToken(token, config))
}

export function printerScannerUpdate(token: string, printerScanner: PrinterScannerUpdateRequest) {
    return axios.put<string>(`${baseUrl}/update`, printerScanner, postToken(token))
}

export function printerScannerCreate(token: string, printerScanner: PrinterScannerCreateRequest) {
    return axios.post<string>(`${baseUrl}/create`, printerScanner, postToken(token))
}