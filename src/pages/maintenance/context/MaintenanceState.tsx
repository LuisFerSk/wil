import { useContext, useEffect, useState } from "react";

import { MaintenanceFindAllBloc, MaintenanceFindAllBlocFailure, MaintenanceFindAllBlocLoading, MaintenanceFindAllBlocSuccess } from "bloc";
import { ProviderProps } from "interfaces";
import { MaintenanceContext } from "./MaintenanceContext";
import { maintenanceFindAll } from "services/maintenance";
import { AuthContext } from "provider/Auth";
import { useFloat } from "hooks";
import { FloatAlert, Modal } from "components";

export default function MaintenanceState(props: ProviderProps) {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [bloc, setBloc] = useState<MaintenanceFindAllBloc>(new MaintenanceFindAllBlocLoading())

    const modalState = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente el equipo!'
    })

    function getMaintenances() {
        maintenanceFindAll(token)
            .then((response) => {
                setBloc(new MaintenanceFindAllBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new MaintenanceFindAllBlocFailure(error))
            })
    }

    useEffect(() => {
        getMaintenances()
    }, [])

    return (
        <MaintenanceContext.Provider
            value={{
                bloc,
                setTitleModal: modalState.setTitle,
                setContentModal: modalState.setContent,
                openModal: modalState.open,
                closeModal: modalState.close,
                openAlert: alertState.open,
                getMaintenances,
            }}
        >
            <Modal title={modalState.title} isOpen={modalState.isOpen} onClose={modalState.close}>
                {modalState.content as JSX.Element}
            </Modal>
            <FloatAlert isOpen={alertState.isOpen} close={alertState.close} severity="success">
                {alertState.content as JSX.Element}
            </FloatAlert>
            {props.children}
        </MaintenanceContext.Provider>
    )
}
