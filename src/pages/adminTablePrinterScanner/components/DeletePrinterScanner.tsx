import { useContext } from 'react';

import { deleteInArrayData } from 'utils'
import { Delete } from 'components';
import { AuthContext } from 'provider/Auth';
import { useMessage } from 'hooks';
import { printerScannerDestroy } from 'services/printer_scanner';
import { AdminTablePrinterScannerContext } from '../context';
import { PrinterScannerFindAllBlocSuccess } from 'bloc';
import { PrinterScannerFindResponse } from 'services/models';

interface Props {
    data: PrinterScannerFindResponse
    closeModal?: Function
    openAlert?: Function
}

export default function PrinterScannerDelete(props: Props) {
    const { data, closeModal, openAlert } = props;

    const { id, serial } = data;

    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const adminTablePrinterScannerContext = useContext(AdminTablePrinterScannerContext)
    const { setBloc } = adminTablePrinterScannerContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        printerScannerDestroy(token, id)
            .then(_ => {
                setBloc && setBloc((old) => {
                    if (old instanceof PrinterScannerFindAllBlocSuccess) {
                        return new PrinterScannerFindAllBlocSuccess(deleteInArrayData(old.state, id))
                    }

                    return old;
                })

                openAlert && openAlert()
                closeModal && closeModal()
            })
            .catch((error) => {
                const { response } = error;

                if (response) {
                    setMessage('error', response.data)
                    return;
                }

                setMessage('error', "Ha sucedió un error al realizar la operación")
            })
    }

    return (
        <Delete
            value={serial}
            onSubmitFormik={onSubmit}
            label='Serial'
            messageError={`Escriba la serial la impresora o scanner: ${serial}`}
            message={message}
        >
            Esta seguro de desea eliminar la impresora o scanner con serial: <strong>{serial}</strong>, si es así escriba el <strong>serial</strong> correspondiente a continuación.
        </Delete>
    )
}
