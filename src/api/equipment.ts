import { postToken } from "api";
import axios, { AxiosResponse } from "axios";
import { EquipmentProps } from "interfaces";

const equipmentBaseUrl: string = `${import.meta.env.VITE_BACKEND_URL}/equipment`

export function equipmentFindAll(token: string): Promise<AxiosResponse<any, any>> {
    return axios.get(`${equipmentBaseUrl}/find-all`, postToken(token))
}

export function equipmentDestroy(token: string, id: number): Promise<AxiosResponse<any, any>> {
    const config = {
        data: { id }
    }
    return axios.delete(`${equipmentBaseUrl}/destroy`, postToken(token, config))
}

export function equipmentUpdate(token: string, equipment: EquipmentProps): Promise<AxiosResponse<any, any>> {
    return axios.put(`${equipmentBaseUrl}/update`, equipment, postToken(token))
}

export function equipmentCreate(token: string, equipment: EquipmentProps): Promise<AxiosResponse<any, any>> {
    return axios.post(`${equipmentBaseUrl}/create`, equipment, postToken(token))
}