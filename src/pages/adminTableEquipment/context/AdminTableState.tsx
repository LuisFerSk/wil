import { useContext, useEffect, useState } from "react";

import { EquipmentFindAllBloc, EquipmentFindAllBlocFailure, EquipmentFindAllBlocLoading, EquipmentFindAllBlocSuccess } from "bloc";
import { ProviderProps } from "interfaces";
import { equipmentFindAll } from "services/equipment";
import { AuthContext } from "provider/Auth";
import { AdminTableContext } from "./AdminTableContext";
import { FloatAlert, Modal } from "components";
import { useFloat } from "hooks";

export default function AdminTableState(props: ProviderProps) {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [equipmentsBloc, setEquipmentsBloc] = useState<EquipmentFindAllBloc>(new EquipmentFindAllBlocLoading())

    const modalState = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente el equipo!'
    })

    function getEquipments() {
        setEquipmentsBloc(new EquipmentFindAllBlocLoading())

        equipmentFindAll(token)
            .then((response) => {
                setEquipmentsBloc(new EquipmentFindAllBlocSuccess(response.data))
            })
            .catch((error) => {
                setEquipmentsBloc(new EquipmentFindAllBlocFailure(error))
            })
    }

    useEffect(() => {
        getEquipments()
    }, [])

    return (
        <AdminTableContext.Provider
            value={{
                equipmentsBloc,
                setEquipmentsBloc,
                setTitleModal: modalState.setTitle,
                setContentModal: modalState.setContent,
                openModal: modalState.open,
                closeModal: modalState.close,
                openAlert: alertState.open,
                getEquipments
            }}
        >
            <Modal title={modalState.title} isOpen={modalState.isOpen} onClose={modalState.close}>
                {modalState.content as JSX.Element}
            </Modal>
            <FloatAlert isOpen={alertState.isOpen} close={alertState.close} severity="success">
                {alertState.content as JSX.Element}
            </FloatAlert>
            {props.children}
        </AdminTableContext.Provider>
    )
}