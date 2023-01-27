import { postToken } from "services";
import axios from "axios";
import { EquipmentProps, IdType } from "interfaces";

const equipmentBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/equipment`

export function equipmentFindAll(token: string) {
    return axios.get(`${equipmentBaseUrl}/find-all`, postToken(token))
}

export function equipmentDestroy(token: string, id: IdType) {
    const config = {
        data: { id }
    }
    return axios.delete(`${equipmentBaseUrl}/destroy`, postToken(token, config))
}

export function equipmentUpdate(token: string, equipment: EquipmentProps) {
    return axios.put(`${equipmentBaseUrl}/update`, equipment, postToken(token))
}

export function equipmentCreate(token: string, equipment: EquipmentProps) {
    return axios.post(`${equipmentBaseUrl}/create`, equipment, postToken(token))
}