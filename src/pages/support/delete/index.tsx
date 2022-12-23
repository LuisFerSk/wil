import { deleteInArrayData } from 'utils'
import { DataTableType, SupportInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { useMessage } from 'hooks';
import { userDestroy } from 'api/user';

interface SupportDeleteProps {
    data: SupportInterface
    setData: Dispatch<SetStateAction<DataTableType<SupportInterface>>>
    closeModal: Function
    openAlert: Function
}


export default function SupportDelete(props: SupportDeleteProps): JSX.Element {
    const { data, setData, closeModal, openAlert } = props;

    const { id, username } = data;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        if (!token) {
            return
        }

        userDestroy(token, id)
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
            value={username}
            onSubmitFormik={onSubmit}
            label='Nombre de usuario'
            messageError={`Escriba el nombre de usuario: ${username}`}
            message={message}
        >
            Esta seguro de desea eliminar el usuario: <strong>{username}</strong> si es así escriba el nombre de este a continuación.

        </Delete>
    )
}
