import { createContext } from 'react'

import { EquipmentFindAllBloc, EquipmentFindAllBlocLoading } from 'bloc'

interface AdminTableContextProps {
    equipmentsBloc: EquipmentFindAllBloc
    setEquipmentsBloc?: React.Dispatch<React.SetStateAction<EquipmentFindAllBloc>>
    setTitleModal?: React.Dispatch<React.SetStateAction<string | null>>
    setContentModal?: React.Dispatch<React.SetStateAction<string | JSX.Element | null>>
    openModal?: VoidFunction
    closeModal?: VoidFunction
    openAlert?: VoidFunction
    getEquipments?: VoidFunction
}

export const AdminTableContext = createContext<AdminTableContextProps>({
    equipmentsBloc: new EquipmentFindAllBlocLoading(),
})