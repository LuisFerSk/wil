import { createContext } from 'react'

import { SupportFindAllBloc, SupportFindAllBlocLoading } from 'bloc'

interface ContextProps {
    bloc: SupportFindAllBloc
    setTitleModal?: React.Dispatch<React.SetStateAction<string | null>>
    setContentModal?: React.Dispatch<React.SetStateAction<string | JSX.Element | null>>
    openModal?: VoidFunction
    closeModal?: VoidFunction
    openAlert?: VoidFunction
    getSupports?: VoidFunction
}

export const SupportContext = createContext<ContextProps>({
    bloc: new SupportFindAllBlocLoading(),
})