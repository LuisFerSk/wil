import { postToken } from "services";
import axios from "axios";
import { IdType, UserProps } from "interfaces";

const userBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/equipment-user`

export function userFindAll(token: string) {
    return axios.get(`${userBaseUrl}/find-all`, postToken(token))
}

export function userDestroy(token: string, id: IdType) {
    const config = {
        data: { id }
    }
    return axios.delete(`${userBaseUrl}/destroy`, postToken(token, config))
}

export function userUpdate(token: string, user: UserProps) {
    return axios.put(`${userBaseUrl}/update`, user, postToken(token))
}

export function userCreate(token: string, user: UserProps) {
    return axios.post(`${userBaseUrl}/create`, user, postToken(token))
}