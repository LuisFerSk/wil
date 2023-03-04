import axios from 'axios';
import { postToken } from "services"
import { SignInRequest, SignInResponse, VerifyTokenResponse } from './models';

const urlBase = `${import.meta.env.VITE_BACKEND_URL}`

export function login(data: SignInRequest) {
    return axios.post<SignInResponse>(`${urlBase}/signin`, data)
}

export function verifyToken(token: string) {
    return axios.get<VerifyTokenResponse>(`${urlBase}/verify-token`, postToken(token))
}