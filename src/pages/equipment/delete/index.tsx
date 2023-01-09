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

    const { id, license_plate } = data;

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
            value={license_plate}
            onSubmitFormik={onSubmit}
            label='Placa'
            messageError={`Escriba la placa del equipo: ${license_plate}`}
            message={message}
        >
            Esta seguro de desea eliminar el equipo con placa: <strong>{license_plate}</strong>, esta acción también <strong>borrara los mantenimientos</strong> de tenga este equipo, si es así escriba la <strong>placa</strong> correspondiente a continuación.
        </Delete>
    )
}
