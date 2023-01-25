import { deleteInArrayData } from 'utils'
import { DataTableType, EquipmentInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { equipmentDestroy } from 'services/equipment';
import { useMessage } from 'hooks';

interface DeleteEquipmentProps {
    data: EquipmentInterface
    setData: Dispatch<SetStateAction<DataTableType<EquipmentInterface>>>
    closeModal: Function
    openAlert: Function
}


export default function EquipmentDelete(props: DeleteEquipmentProps): JSX.Element {
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
            .catch(({ response }) => {
                console.log(response)
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
