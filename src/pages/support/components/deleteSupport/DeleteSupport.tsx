import { deleteInArrayData } from 'utils'
import { SupportInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { useMessage } from 'hooks';
import { userDestroy } from 'services/user';

interface Props {
    data: SupportInterface
    setData: Dispatch<SetStateAction<SupportInterface[]>>
    closeModal: Function
    openAlert: Function
}


export default function DeleteSupport(props: Props) {
    const { data, setData, closeModal, openAlert } = props;

    const { id, username } = data;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        userDestroy(token, id)
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
