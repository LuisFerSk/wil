import { useContext, useEffect, useState } from "react";

import { PrinterScannerFindAllBloc, PrinterScannerFindAllBlocFailure, PrinterScannerFindAllBlocLoading, PrinterScannerFindAllBlocSuccess } from "bloc";
import { ProviderProps } from "interfaces";
import { AuthContext } from "provider/Auth";
import { AdminTablePrinterScannerContext } from "./AdminTablePrinterScannerContext";
import { FloatAlert, Modal } from "components";
import { useFloat } from "hooks";
import { printerScannerFindAll } from "services/printer_scanner";

export default function AdminTableState(props: ProviderProps) {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [bloc, setBloc] = useState<PrinterScannerFindAllBloc>(new PrinterScannerFindAllBlocLoading())

    const modalState = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente la impresora o scanner!'
    })

    function getPrinterScanner() {
        printerScannerFindAll(token)
            .then((response) => {
                setBloc(new PrinterScannerFindAllBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new PrinterScannerFindAllBlocFailure(error))
            })
    }

    useEffect(() => {
        getPrinterScanner()
    }, [])

    return (
        <AdminTablePrinterScannerContext.Provider
            value={{
                bloc,
                setBloc,
                setTitleModal: modalState.setTitle,
                setContentModal: modalState.setContent,
                openModal: modalState.open,
                closeModal: modalState.close,
                openAlert: alertState.open,
                getPrinterScanner
            }}
        >
            <Modal title={modalState.title} isOpen={modalState.isOpen} onClose={modalState.close}>
                {modalState.content as JSX.Element}
            </Modal>
            <FloatAlert isOpen={alertState.isOpen} close={alertState.close} severity="success">
                {alertState.content as JSX.Element}
            </FloatAlert>
            {props.children}
        </AdminTablePrinterScannerContext.Provider>
    )
}