import axios from 'axios';
import { baseUrlApi } from '.';

const usuarioBaseURL = `${baseUrlApi}/authentication`;

interface usuario {
    username: string,
    password: string,
}

export function login(data: usuario) {
    const { username, password } = data;

    const params = new URLSearchParams();

    params.append('username', username);
    params.append('password', password);

    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };

    return axios.post(usuarioBaseURL, params, options)
}