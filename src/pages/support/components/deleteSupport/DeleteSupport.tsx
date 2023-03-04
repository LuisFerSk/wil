import { useContext } from 'react';

import { deleteInArrayData } from 'utils'
import { Delete } from 'components';
import { AuthContext } from 'provider/Auth';
import { useMessage } from 'hooks';
import { supportDestroy } from 'services/support';
import { SupportFindResponse } from 'services/models';
import { SupportContext } from 'pages/support/context';

interface Props {
    data: SupportFindResponse
}

export default function DeleteSupport(props: Props) {
    const { id, username } = props.data;

    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const supportContext = useContext(SupportContext)
    const { getSupports, openAlert, closeModal } = supportContext;

    const [message, setMessage, messageLoader] = useMessage()

    const onSubmit = () => {
        messageLoader()

        supportDestroy(token, id)
            .then((_) => {
                getSupports && getSupports()
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
