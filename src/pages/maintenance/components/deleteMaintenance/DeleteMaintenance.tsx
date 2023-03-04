import { useContext } from 'react';

import { Delete } from 'components';
import { AuthContext } from 'provider/Auth';
import { useMessage } from 'hooks';
import { maintenanceDestroy } from 'services/maintenance';
import { MaintenanceFindResponse } from 'services/models';
import { MaintenanceContext } from 'pages/maintenance/context';

interface Props {
    data: MaintenanceFindResponse
}

export default function DeleteMaintenance(props: Props) {
    const { id } = props.data;

    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const maintenanceContext = useContext(MaintenanceContext)
    const { openAlert, closeModal, getMaintenances } = maintenanceContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        maintenanceDestroy(token, id)
            .then(response => {
                getMaintenances && getMaintenances()
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
                console.log(error)
            })
    }

    return (
        <Delete
            value={id}
            onSubmitFormik={onSubmit}
            label='Id'
            messageError={`Escriba el id del mantenimiento: ${id}`}
            message={message}
        >
            Esta seguro de desea eliminar el mantenimiento con id: <strong>{id}</strong> si es así escriba el <strong>id</strong> correspondiente a continuación.
        </Delete>
    )
}
