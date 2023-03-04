import axios from "axios";

import { postToken } from "services";
import { BrandFindAllResponse } from "./models";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/brand`

export function brandFindAllByEquipment(token: string) {
    return axios.get<BrandFindAllResponse[]>(`${baseUrl}/find-all-by-equipment`, postToken(token))
}

export function brandFindAllByPrinterScanner(token: string) {
    return axios.get<BrandFindAllResponse[]>(`${baseUrl}/find-all-by-printer-scanner`, postToken(token))
}