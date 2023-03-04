import { useState, useEffect, createContext } from 'react'

import { verifyToken } from 'services/auth'
import { useLocalStorage } from 'hooks'
import { ProviderProps } from 'interfaces'
import { serializeToken } from 'utils'
import { VerifyTokenResponse, SignInResponse } from 'services/models'

const initToken = ''

interface AuthContextProps {
    user?: VerifyTokenResponse | null
    token: string
    login?: (data: SignInResponse) => void
    logout?: VoidFunction
}

export const AuthContext = createContext<AuthContextProps>({
    token: initToken,
})

export default function AuthState(props: ProviderProps) {
    const { children } = props;

    const [user, setUser] = useState<VerifyTokenResponse | null>()

    const [token, setToken] = useLocalStorage('token', initToken)

    const [serializedToken, setSerializedToken] = useState<string>(token)

    function logout() {
        setToken(initToken)
    }

    function login(data: SignInResponse) {
        setToken(data.token)
    }

    useEffect(() => {
        if (token) {
            const _serializedToken = serializeToken(token)

            setSerializedToken(_serializedToken)

            verifyToken(_serializedToken)
                .then((response) => {
                    setUser(response.data)
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
        <AuthContext.Provider
            value={{
                user,
                token: serializedToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}