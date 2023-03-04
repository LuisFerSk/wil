import axios from "axios";

import { postToken } from "services";
import { ChangePasswordRequest, SupportCreateRequest, SupportFindResponse } from "./models";

const userBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/support`

export function supportFindAll(token: string) {
    return axios.get<SupportFindResponse[]>(`${userBaseUrl}/find-all`, postToken(token))
}

export function supportDestroy(token: string, id: number) {
    const config = {
        data: { id }
    }
    return axios.delete<string>(`${userBaseUrl}/destroy`, postToken(token, config))
}

export function supportCreate(token: string, user: SupportCreateRequest) {
    return axios.post(`${userBaseUrl}/create`, user, postToken(token))
}

export function changePassword(token: string, data: ChangePasswordRequest) {
    return axios.put<string>(`${userBaseUrl}/change-password`, data, postToken(token))
}

export function changeMePassword(token: string, password: string) {
    return axios.put<string>(`${userBaseUrl}/change-me-password`, { password }, postToken(token))
}