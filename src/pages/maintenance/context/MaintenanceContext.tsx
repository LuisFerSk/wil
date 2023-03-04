import { createContext } from 'react'

import { MaintenanceFindAllBloc, MaintenanceFindAllBlocLoading } from 'bloc'

interface ContextProps {
    bloc: MaintenanceFindAllBloc
    setTitleModal?: React.Dispatch<React.SetStateAction<string | null>>
    setContentModal?: React.Dispatch<React.SetStateAction<string | JSX.Element | null>>
    openModal?: VoidFunction
    closeModal?: VoidFunction
    openAlert?: VoidFunction
    getMaintenances?: VoidFunction
}

export const MaintenanceContext = createContext<ContextProps>({
    bloc: new MaintenanceFindAllBlocLoading(),
})