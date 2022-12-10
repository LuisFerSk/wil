import { AxiosRequestConfig } from "axios";

export function postToken(token: string, config?: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    if (config) {
        return { ...config, headers: { ...config.headers, "x-access-token": token } };
    }
    return { headers: { "x-access-token": token } };
}