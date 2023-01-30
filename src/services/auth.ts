import axios from 'axios';
import { postToken } from "services"

interface usuario {
    username: string,
    password: string,
}

const urlBase = `${import.meta.env.VITE_BACKEND_URL}`

export function login(data: usuario) {
    return axios.post(`${urlBase}/singin`, data)
}

export function verifyToken(token: string) {
    return axios.get(`${urlBase}/verify-token`, postToken(token))
}