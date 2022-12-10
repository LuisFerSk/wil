import axios from 'axios';
import { postToken } from "./"

interface usuario {
    username: string,
    password: string,
}

export function login(data: usuario) {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/singin`, data)
}

export function verifyToken(token: string) {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-token`, postToken(token))
}