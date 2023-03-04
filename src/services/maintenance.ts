import { postToken } from "services";
import axios from "axios";
import { IdType, MaintenanceProps } from "interfaces";
import { MaintenanceCreateRequest, MaintenanceFindMadePerDayResponse, MaintenanceFindResponse } from "./models";

const maintenanceBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/maintenance`

export function maintenanceFindAll(token: string) {
    return axios.get<MaintenanceFindResponse[]>(`${maintenanceBaseUrl}/find-all`, postToken(token))
}

export function maintenanceFind(token: string, id: string) {
    return axios.get<MaintenanceFindResponse>(`${maintenanceBaseUrl}/find/${id}`, postToken(token))
}

export function maintenanceFindMadePerDay(token: string) {
    return axios.get<MaintenanceFindMadePerDayResponse[]>(`${maintenanceBaseUrl}/find-made-per-day`, postToken(token))
}

export function maintenanceDestroy(token: string, id: string) {
    const config = {
        data: { id }
    }
    return axios.delete<string>(`${maintenanceBaseUrl}/destroy`, postToken(token, config))
}

export function maintenanceCreate(token: string, maintenance: MaintenanceCreateRequest) {
    const headers = {
        "Content-Type": 'multipart/form-data'
    }

    const formData = new FormData()

    let key: keyof MaintenanceCreateRequest

    for (key in maintenance) {
        const value = maintenance[key] as string | Blob
        formData.append(key, value)
    };

    return axios.post<MaintenanceFindResponse>(`${maintenanceBaseUrl}/create`, formData, postToken(token, { headers }))
}