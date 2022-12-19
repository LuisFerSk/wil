import { postToken } from "api";
import axios, { AxiosResponse } from "axios";
import { IdType, UserProps } from "interfaces";

const userBaseUrl: string = `${import.meta.env.VITE_BACKEND_URL}/equipment-user`

export function userFindAll(token: string): Promise<AxiosResponse<any, any>> {
    return axios.get(`${userBaseUrl}/find-all`, postToken(token))
}

export function userDestroy(token: string, id: IdType): Promise<AxiosResponse<any, any>> {
    const config = {
        data: { id }
    }
    return axios.delete(`${userBaseUrl}/destroy`, postToken(token, config))
}

export function userUpdate(token: string, user: UserProps): Promise<AxiosResponse<any, any>> {
    return axios.put(`${userBaseUrl}/update`, user, postToken(token))
}

export function userCreate(token: string, user: UserProps): Promise<AxiosResponse<any, any>> {
    return axios.post(`${userBaseUrl}/create`, user, postToken(token))
}