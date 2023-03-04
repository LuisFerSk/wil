import { useContext, useEffect, useState } from "react";

import { SupportFindAllBloc, SupportFindAllBlocFailure, SupportFindAllBlocLoading, SupportFindAllBlocSuccess } from "bloc";
import { ProviderProps } from "interfaces";
import { SupportContext } from "./SupportContext";
import { supportFindAll } from "services/support";
import { AuthContext } from "provider/Auth";
import { useFloat } from "hooks";
import { FloatAlert, Modal } from "components";

export default function SupportState(props: ProviderProps) {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [bloc, setBloc] = useState<SupportFindAllBloc>(new SupportFindAllBlocLoading())

    const modalState = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente el soporte!'
    })

    function getSupports() {
        supportFindAll(token)
            .then((response) => {
                setBloc(new SupportFindAllBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new SupportFindAllBlocFailure(error))
            })
    }

    useEffect(() => {
        getSupports()
    }, [])

    return (
        <SupportContext.Provider
            value={{
                bloc,
                setTitleModal: modalState.setTitle,
                setContentModal: modalState.setContent,
                openModal: modalState.open,
                closeModal: modalState.close,
                openAlert: alertState.open,
                getSupports,
            }}
        >
            <Modal title={modalState.title} isOpen={modalState.isOpen} onClose={modalState.close}>
                {modalState.content as JSX.Element}
            </Modal>
            <FloatAlert isOpen={alertState.isOpen} close={alertState.close} severity="success">
                {alertState.content as JSX.Element}
            </FloatAlert>
            {props.children}
        </SupportContext.Provider>
    )
}
