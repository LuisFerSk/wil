import { postToken } from "services";
import axios, { AxiosResponse } from "axios";
import { IdType, MaintenanceProps } from "interfaces";

const maintenanceBaseUrl: string = `${import.meta.env.VITE_BACKEND_URL}/maintenance`

export function maintenanceFindAll(token: string): Promise<AxiosResponse<any, any>> {
    return axios.get(`${maintenanceBaseUrl}/find-all`, postToken(token))
}

export function maintenanceFindMadePerDay(token: string): Promise<AxiosResponse<any, any>> {
    return axios.get(`${maintenanceBaseUrl}/find-made-per-day`, postToken(token))
}

export function maintenanceDestroy(token: string, id: IdType): Promise<AxiosResponse<any, any>> {
    const config = {
        data: { id }
    }
    return axios.delete(`${maintenanceBaseUrl}/destroy`, postToken(token, config))
}

export function maintenanceUpdate(token: string, maintenance: MaintenanceProps): Promise<AxiosResponse<any, any>> {
    return axios.put(`${maintenanceBaseUrl}/update`, maintenance, postToken(token))
}

export function maintenanceCreate(token: string, maintenance: MaintenanceProps): Promise<AxiosResponse<any, any>> {
    const headers = {
        "Content-Type": 'multipart/form-data'
    }

    const formData = new FormData()

    let key: keyof MaintenanceProps

    for (key in maintenance) {
        if (typeof maintenance[key] === "boolean" && maintenance[key]) {
            formData.append(key, '1')
            continue;
        }

        if (typeof maintenance[key] === "boolean" && !maintenance[key]) {
            formData.append(key, '0')
            continue;
        }

        const value = maintenance[key] as string | Blob
        formData.append(key, value)
    };

    return axios.post(`${maintenanceBaseUrl}/create`, formData, postToken(token, { headers }))
}