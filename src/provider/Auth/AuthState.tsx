import { verifyToken } from 'api/auth'
import { useLocalStorage } from 'hooks'
import { ProviderProps } from 'interfaces'
import { useState, useEffect } from 'react'

import { createContext } from 'react'
import { serializarToken } from 'utils'

const initToken = ''

interface loginProps {
    status: string,
    message: string
    username: string
    token: string
}

const initialStateAuthState = {
    user: undefined,
    token: initToken,
    login: () => { },
    logout: () => { },
    getUser: () => { return undefined },
}

export const authContext = createContext<AuthContextProps>(initialStateAuthState)

interface AuthContextProps {
    user: string | undefined | null
    token: string | undefined
    login: (data: loginProps) => void
    logout: () => void
}

export default function AuthState(props: ProviderProps): JSX.Element {
    const { children } = props;

    const [user, setUser] = useState<string | undefined | null>()

    const [token, setToken] = useLocalStorage('token', initToken)

    const [tokenSerializado, setTokenSerializado] = useState(token)

    function logout(): void {
        setToken(initToken)
    }

    function login(data: loginProps): void {
        setToken(data.token)
        setUser(data.username)
    }

    useEffect(() => {
        if (typeof token === 'string' && token.length > 0) {
            const _tokenSerializado = serializarToken(token)

            setTokenSerializado(_tokenSerializado)

            verifyToken(_tokenSerializado)
                .then(({ data }) => {
                    setUser(data.info.username)
                })
                .catch(error => {
                    console.log(error)
                    setUser(null)
                })
            return;
        }
        setUser(null)
    }, [token])

    return (
        <authContext.Provider
            value={{
                user,
                token: tokenSerializado,
                login,
                logout,
            }}
        >
            {children}
        </authContext.Provider>
    )
}