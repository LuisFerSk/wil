import { postToken } from "api";
import axios, { AxiosResponse } from "axios";
import { IdType, SupportProps } from "interfaces";

const userBaseUrl: string = `${import.meta.env.VITE_BACKEND_URL}/support`

export function supportFindAll(token: string): Promise<AxiosResponse<any, any>> {
    return axios.get(`${userBaseUrl}/find-all`, postToken(token))
}

export function supportDestroy(token: string, id: IdType): Promise<AxiosResponse<any, any>> {
    const config = {
        data: { id }
    }
    return axios.delete(`${userBaseUrl}/destroy`, postToken(token, config))
}

export function supportUpdate(token: string, user: SupportProps): Promise<AxiosResponse<any, any>> {
    return axios.put(`${userBaseUrl}/update`, user, postToken(token))
}

export function supportCreate(token: string, user: SupportProps): Promise<AxiosResponse<any, any>> {
    return axios.post(`${userBaseUrl}/create`, user, postToken(token))
}

interface ChangePasswordProps {
    token: string
    id: IdType
    password: string
}

export function changePassword(props: ChangePasswordProps): Promise<AxiosResponse<any, any>> {
    const { token, ...user } = props;

    return axios.put(`${userBaseUrl}/change-password`, user, postToken(token))
}