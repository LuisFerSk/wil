import axios from 'axios';
import { baseUrlApi, postToken } from '.';

const usuarioBaseURL = `${baseUrlApi}/usuario`;

export function usuarioGetAll(token: string) {
    return axios.get(usuarioBaseURL, postToken(token)).then((response) => response)
}

interface usuario {
    username: string,
    password: string,
}

export function usuarioInsert(data: usuario, token: string) {
    const { username, password } = data;

    const params = new URLSearchParams();

    params.append('username', username);
    params.append('password', password);

    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };
    return axios.post(usuarioBaseURL, params, postToken(token, options))
}

export function getMe(token: string) {
    return axios.get(`${usuarioBaseURL}/me`, postToken(token))
}


interface changePasswordProps {
    password: string,
    id: string,
    token: string
}

export function changePassword(props: changePasswordProps) {
    const { password, id, token } = props;

    const params = new URLSearchParams();

    params.append('id', id);
    params.append('password', password);

    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };

    return axios.put(`${usuarioBaseURL}/password`, params, postToken(token, options))
}

interface changeMePasswordProps {
    password: string,
    token: string
}

export function changeMePassword(props: changeMePasswordProps) {
    const { password, token } = props;

    const params = new URLSearchParams();

    params.append('password', password);

    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };

    return axios.put(`${usuarioBaseURL}/me/password`, params, postToken(token, options))
}

export function usuarioDelete(id: string, token: string) {
    const params = new URLSearchParams();

    params.append('id', id);

    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
    };

    return axios.delete(usuarioBaseURL, postToken(token, options))
}

export function usuarioDisable(id: string, token: string) {
    const params = new URLSearchParams();

    params.append('id', id);

    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };

    return axios.put(`${usuarioBaseURL}/disable`, params, postToken(token, options))
}

export function usuarioEnable(id: string, token: string) {
    const params = new URLSearchParams();

    params.append('id', id);

    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };

    return axios.put(`${usuarioBaseURL}/enable`, params, postToken(token, options))
}