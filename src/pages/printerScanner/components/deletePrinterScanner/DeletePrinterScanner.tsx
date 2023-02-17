import { deleteInArrayData } from 'utils'
import { PrinterScannerInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { useMessage } from 'hooks';
import { printerScannerDestroy } from 'services/printer_scanner';

interface Props {
    data: PrinterScannerInterface
    setData: Dispatch<SetStateAction<PrinterScannerInterface[]>>
    closeModal: Function
    openAlert: Function
}

export default function PrinterScannerDelete(props: Props) {
    const { data, setData, closeModal, openAlert } = props;

    const { id, serial } = data;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        printerScannerDestroy(token, id)
            .then(response => {
                setData(old => deleteInArrayData(old, id))
                openAlert()
                closeModal()
            })
            .catch((error) => {
                const { response } = error;
                if (response) {
                    setMessage('error', response.data)
                    return;
                }
                setMessage('error', "Ha sucedió un error al realizar la operación")
                console.log(error)
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
