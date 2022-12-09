import { deleteInArrayData } from 'utils'
import { DataTableType, EquipoInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { equipoDelete } from 'api/equipo';
import { useMessage } from 'hooks';

interface DeleteEquipmentProps {
    data: EquipoInterface
    setData: Dispatch<SetStateAction<DataTableType<EquipoInterface>>>
    closeModal: Function
    openAlert: Function
}

const DeleteEquipment = ({ data, setData, closeModal, openAlert }: DeleteEquipmentProps) => {
    const { id, numeroSerialCPU } = data;

    const authsContext = useContext(authContext)
    const { token } = authsContext;

    const [mensaje, setMensaje, mensajeLoader] = useMessage()

    const onSubmit = () => {
        mensajeLoader()
        equipoDelete(id, token)
            .then(response => {
                if (response.status === 200) {
                    setData(old => deleteInArrayData(old, id))
                    openAlert()
                    closeModal()
                    return;
                }
                setMensaje('error', response.data.message)
                console.log(response)
            })
            .catch(({ response }) => {
                console.log(response)
            })
    }

    return (
        <Delete
            value={numeroSerialCPU}
            onSubmitFormik={onSubmit}
            label='Número serial'
            mensajeError={`Escriba el número serial del equipo: ${numeroSerialCPU}`}
            mensaje={mensaje}
        >
            Esta seguro de desea eliminar el equipo con número serial: <strong>{numeroSerialCPU}</strong> si es así escriba el número serial correspondiente a continuación.

        </Delete>
    )
}

export default DeleteEquipment;
