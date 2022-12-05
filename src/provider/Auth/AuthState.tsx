import { getMe } from 'api/usuario'
import { useLocalStorage } from 'hooks'
import { BasicUserInterface, ProviderProps, SectorialInterface, SubsectorInterface, TipoDispositivoInterface } from 'interfaces'
import { useState, useEffect } from 'react'

import { createContext } from 'react'
import { serializarToken } from 'utils'

const initToken = ''

const initialStateConstantState = {
    sectoriales: [],
    subsectores: [],
    tipoDispositivos: []
}

const initialStateAuthState = {
    user: undefined,
    token: initToken,
    login: (token: string) => { },
    logout: () => { },
    getUser: () => { return undefined },
    ...initialStateConstantState
}

export const authContext = createContext<AuthContextProps>(initialStateAuthState)

interface ContextProps {
    sectoriales: SectorialInterface[] | never[],
    subsectores: SubsectorInterface[] | never[],
    tipoDispositivos: TipoDispositivoInterface[] | never[]
}

interface AuthContextProps extends ContextProps {
    user: BasicUserInterface | undefined | null
    token: string | undefined
    login: (token: string) => void
    logout: () => void
}

export default function AuthState(props: ProviderProps): JSX.Element {
    const { children } = props;

    const [user, setUser] = useState<BasicUserInterface | undefined | null>()

    const [token, setToken] = useLocalStorage('token', initToken);

    const [tokenSerializado, setTokenSerializado] = useState(token)

    function logout(): void {
        setToken(initToken)
    }

    function login(token: string): void {
        setToken(token)
    }

    const [constants, setConstants] = useState<ContextProps>(initialStateConstantState)

    useEffect(() => {
        if (typeof token === 'string' && token.length > 0) {
            const _tokenSerializado = serializarToken(token)

            setTokenSerializado(_tokenSerializado)

            getMe(_tokenSerializado)
                .then(result => {
                    if (result.status === 200) {
                        setUser(result.data.data)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setUser(null)
                })
            return;
        }
        setUser(null)
        setConstants(initialStateConstantState)
    }, [token])

    return (
        <authContext.Provider
            value={{
                user,
                token: tokenSerializado,
                login,
                logout,
                ...constants
            }}
        >
            {children}
        </authContext.Provider>
    )
}