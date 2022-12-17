import { deleteInArrayData } from 'utils'
import { DataTableType, EquipmentInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { equipmentDestroy } from 'api/equipment';
import { useMessage } from 'hooks';

interface DeleteEquipmentProps {
    data: EquipmentInterface
    setData: Dispatch<SetStateAction<DataTableType<EquipmentInterface>>>
    closeModal: Function
    openAlert: Function
}


export default function EquipmentDelete(props: DeleteEquipmentProps): JSX.Element {
    const { data, setData, closeModal, openAlert } = props;

    const { id, license_plate } = data;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        if (!token) {
            return
        }

        equipmentDestroy(token, id)
            .then(response => {
                if (response.status >= 200 || response.status < 300) {
                    setData(old => deleteInArrayData(old, id))
                    openAlert()
                    closeModal()
                    return;
                }
                setMessage('error', response.data)
                console.log(response)
            })
            .catch(({ response }) => {
                console.log(response)
            })
    }

    return (
        <Delete
            value={license_plate}
            onSubmitFormik={onSubmit}
            label='Placa'
            messageError={`Escriba la placa del equipo: ${license_plate}`}
            message={message}
        >
            Esta seguro de desea eliminar el equipo con placa: <strong>{license_plate}</strong> si es así escriba la placa correspondiente a continuación.

        </Delete>
    )
}
