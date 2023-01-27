import { postToken } from "services";
import axios from "axios";

const equipmentBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/brand`

export function brandFindAll(token: string) {
    return axios.get(`${equipmentBaseUrl}/find-all`, postToken(token))
}