import { deleteInArrayData } from 'utils'
import { DataTableType, MaintenanceInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { useMessage } from 'hooks';
import { maintenanceDestroy } from 'api/maintenance';

interface MaintenanceDeleteProps {
    data: MaintenanceInterface
    setData: Dispatch<SetStateAction<DataTableType<MaintenanceInterface>>>
    closeModal: Function
    openAlert: Function
}


export default function MaintenanceDelete(props: MaintenanceDeleteProps): JSX.Element {
    const { data, setData, closeModal, openAlert } = props;

    const { id } = data;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        if (!token) {
            return
        }

        maintenanceDestroy(token, id)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
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
            value={id}
            onSubmitFormik={onSubmit}
            label='Id'
            messageError={`Escriba el id del mantenimiento: ${id}`}
            message={message}
        >
            Esta seguro de desea eliminar el mantenimiento con id: <strong>{id}</strong> si es así escriba el id correspondiente a continuación.

        </Delete>
    )
}
