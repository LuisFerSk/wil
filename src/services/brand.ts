import { postToken } from "services";
import axios from "axios";

const equipmentBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/brand`

export function brandFindAllByEquipment(token: string) {
    return axios.get(`${equipmentBaseUrl}/find-all-by-equipment`, postToken(token))
}

export function brandFindAllByPrinterScanner(token: string) {
    return axios.get(`${equipmentBaseUrl}/find-all-by-printer-scanner`, postToken(token))
}