import axios from "axios";

import { postToken } from "services";
import { EquipmentCreateRequest, EquipmentFindResponse, EquipmentUpdateRequest } from "./models";

const equipmentBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/equipment`

export function equipmentFindAll(token: string) {
    return axios.get<EquipmentFindResponse[]>(`${equipmentBaseUrl}/find-all`, postToken(token))
}

export function equipmentFind(token: string, id?: string) {
    return axios.get<EquipmentFindResponse>(`${equipmentBaseUrl}/find/${id}`, postToken(token))
}

export function equipmentDestroy(token: string, id: number) {
    const config = {
        data: { id }
    }
    return axios.delete<string>(`${equipmentBaseUrl}/destroy`, postToken(token, config))
}

export function equipmentUpdate(token: string, equipment: EquipmentUpdateRequest) {
    return axios.put<string>(`${equipmentBaseUrl}/update`, equipment, postToken(token))
}

export function equipmentCreate(token: string, equipment: EquipmentCreateRequest) {
    return axios.post<string>(`${equipmentBaseUrl}/create`, equipment, postToken(token))
}