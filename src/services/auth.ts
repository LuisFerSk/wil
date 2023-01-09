import axios, { AxiosResponse } from 'axios';
import { postToken } from "services"

interface usuario {
    username: string,
    password: string,
}

export function login(data: usuario): Promise<AxiosResponse<any, any>> {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/singin`, data)
}

export function verifyToken(token: string): Promise<AxiosResponse<any, any>> {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-token`, postToken(token))
}