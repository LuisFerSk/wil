import { postToken } from "services";
import axios from "axios";
import { IdType, PrinterScannerProps } from "interfaces";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/printer_scanner`

export function printerScannerFindAll(token: string) {
    return axios.get(`${baseUrl}/find-all`, postToken(token))
}

export function printerScannerDestroy(token: string, id: IdType) {
    const config = {
        data: { id }
    }
    return axios.delete(`${baseUrl}/destroy`, postToken(token, config))
}

export function printerScannerUpdate(token: string, printerScanner: PrinterScannerProps) {
    return axios.put(`${baseUrl}/update`, printerScanner, postToken(token))
}

export function printerScannerCreate(token: string, printerScanner: PrinterScannerProps) {
    return axios.post(`${baseUrl}/create`, printerScanner, postToken(token))
}