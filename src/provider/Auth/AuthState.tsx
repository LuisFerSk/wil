import { verifyToken } from 'services/auth'
import { useLocalStorage } from 'hooks'
import { ProviderProps } from 'interfaces'
import { useState, useEffect } from 'react'
import { createContext } from 'react'
import { serializeToken } from 'utils'

const initToken: string = ''

interface UserApiInterface {
    username: string
    role: string
}

interface loginProps {
    status: string,
    message: string
    info: UserApiInterface
    token: string
}

const initialStateAuthState = {
    user: undefined,
    token: initToken,
    login: () => { },
    logout: () => { },
    getUser: () => { return undefined },
}

interface AuthContextProps {
    user: UserApiInterface | undefined | null
    token: string
    login: (data: loginProps) => void
    logout: () => void
}

export const authContext = createContext<AuthContextProps>(initialStateAuthState)

export default function AuthState(props: ProviderProps): JSX.Element {
    const { children } = props;

    const [user, setUser] = useState<UserApiInterface | undefined | null>()

    const [token, setToken] = useLocalStorage('token', initToken)

    const [serializedToken, setSerializedToken] = useState<string>(token)

    function logout(): void {
        setToken(initToken)
    }

    function login(data: loginProps): void {
        setToken(data.token)
    }

    useEffect(() => {
        if (typeof token === 'string' && token.length > 0) {
            const _serializedToken = serializeToken(token)

            setSerializedToken(_serializedToken)

            verifyToken(_serializedToken)
                .then(({ data }) => {
                    setUser(data.info)
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
                token: serializedToken,
                login,
                logout,
            }}
        >
            {children}
        </authContext.Provider>
    )
}