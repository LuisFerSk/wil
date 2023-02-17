import { deleteInArrayData } from 'utils'
import { EquipmentInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { equipmentDestroy } from 'services/equipment';
import { useMessage } from 'hooks';

interface Props {
    data: EquipmentInterface
    setData: Dispatch<SetStateAction<EquipmentInterface[]>>
    closeModal: Function
    openAlert: Function
}


export default function DeleteEquipment(props: Props) {
    const { data, setData, closeModal, openAlert } = props;

    const { id, serial } = data;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        equipmentDestroy(token, id)
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
            messageError={`Escriba la placa del equipo: ${serial}`}
            message={message}
        >
            Esta seguro de desea eliminar el equipo con serial: <strong>{serial}</strong>, esta acción también <strong>borrara los mantenimientos</strong> de tenga este equipo, si es así escriba el <strong>serial</strong> correspondiente a continuación.
        </Delete>
    )
}
