import { AxiosRequestConfig } from "axios";

const baseUrl = 'https://itecnologico.valledupar.gov.co/'

export const baseUrlApi = `${baseUrl}api`;

export function postToken(token: string, config?: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    if (config) {
        return { ...config, headers: { ...config.headers, "token": token } };
    }
    return { headers: { "token": token } };
}