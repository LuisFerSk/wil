import { useContext } from 'react';

import { Delete } from 'components'
import { AuthContext } from 'provider/Auth'
import { equipmentDestroy } from 'services/equipment'
import { useMessage } from 'hooks'
import { EquipmentFindResponse } from 'services/models'
import { AdminTableContext } from '../context';
import { EquipmentFindAllBlocSuccess } from 'bloc';
import { deleteInArrayData } from 'utils';

interface Props {
    data: EquipmentFindResponse
    closeModal?: Function
    openAlert?: Function
}

export default function DeleteEquipment(props: Props) {
    const { data, closeModal, openAlert } = props;

    const { id, serial } = data;

    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const adminTableContext = useContext(AdminTableContext)
    const { setEquipmentsBloc } = adminTableContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        equipmentDestroy(token, id)
            .then(_ => {
                setEquipmentsBloc && setEquipmentsBloc((old) => {
                    if (old instanceof EquipmentFindAllBlocSuccess) {
                        return new EquipmentFindAllBlocSuccess(deleteInArrayData(old.state, id))
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
            messageError={`Escriba la placa del equipo: ${serial}`}
            message={message}
        >
            Esta seguro de desea eliminar el equipo con serial: <strong>{serial}</strong>, esta acción también <strong>borrara los mantenimientos</strong> de tenga este equipo, si es así escriba el <strong>serial</strong> correspondiente a continuación.
        </Delete>
    )
}
