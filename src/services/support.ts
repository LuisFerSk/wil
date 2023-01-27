import { postToken } from "services";
import axios from "axios";
import { IdType, SupportProps } from "interfaces";

const userBaseUrl = `${import.meta.env.VITE_BACKEND_URL}/support`

export function supportFindAll(token: string) {
    return axios.get(`${userBaseUrl}/find-all`, postToken(token))
}

export function supportDestroy(token: string, id: IdType) {
    const config = {
        data: { id }
    }
    return axios.delete(`${userBaseUrl}/destroy`, postToken(token, config))
}

export function supportUpdate(token: string, user: SupportProps) {
    return axios.put(`${userBaseUrl}/update`, user, postToken(token))
}

export function supportCreate(token: string, user: SupportProps) {
    return axios.post(`${userBaseUrl}/create`, user, postToken(token))
}

interface ChangePasswordProps {
    token: string
    id: IdType
    password: string
}

export function changePassword(props: ChangePasswordProps) {
    const { token, ...user } = props;

    return axios.put(`${userBaseUrl}/change-password`, user, postToken(token))
}

interface ChangeMePasswordProps {
    token: string
    password: string
}

export function changeMePassword(props: ChangeMePasswordProps) {
    const { token, ...user } = props;

    return axios.put(`${userBaseUrl}/change-me-password`, user, postToken(token))
}