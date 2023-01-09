import { postToken } from "services";
import axios, { AxiosResponse } from "axios";

const equipmentBaseUrl: string = `${import.meta.env.VITE_BACKEND_URL}/brand`

export function brandFindAll(token: string): Promise<AxiosResponse<any, any>> {
    return axios.get(`${equipmentBaseUrl}/find-all`, postToken(token))
}