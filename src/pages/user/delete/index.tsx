import { deleteInArrayData } from 'utils'
import { DataTableType, UserInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { useMessage } from 'hooks';
import { userDestroy } from 'api/user';

interface DeleteUserProps {
    data: UserInterface
    setData: Dispatch<SetStateAction<DataTableType<UserInterface>>>
    closeModal: Function
    openAlert: Function
}


export default function UserDelete(props: DeleteUserProps): JSX.Element {
    const { data, setData, closeModal, openAlert } = props;

    const { id, cc } = data;

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
            value={cc}
            onSubmitFormik={onSubmit}
            label='Placa'
            messageError={`Escriba la cédula del usuario: ${cc}`}
            message={message}
        >
            Esta seguro de desea eliminar el usuario con cédula: <strong>{cc}</strong> si es así escriba la cédula correspondiente a continuación.

        </Delete>
    )
}
