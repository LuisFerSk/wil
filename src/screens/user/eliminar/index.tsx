import { deleteInArrayData } from 'utils'
import { DataTableType, UsuarioInterface } from 'interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Delete } from 'components';
import { authContext } from 'provider/Auth';
import { useMessage } from 'hooks';
import { usuarioDelete } from 'api/usuario';

interface DeleteUserProps {
    data: UsuarioInterface
    setData: Dispatch<SetStateAction<DataTableType<UsuarioInterface>>>
    closeModal: Function
    openAlert: Function
}

const DeleteUser = ({ data, setData, closeModal, openAlert }: DeleteUserProps) => {
    const { id, username } = data;

    const authsContext = useContext(authContext)
    const { token } = authsContext;

    const [mensaje, setMensaje, mensajeLoader] = useMessage()

    const onSubmit = () => {
        mensajeLoader()
        usuarioDelete(id, token)
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
            value={username}
            onSubmitFormik={onSubmit}
            label='Nombre de usuario'
            mensajeError={`Escriba el nombre de usuario: ${username}`}
            mensaje={mensaje}
        >
            Esta seguro de desea eliminar el usuario con nombre de usuario: <strong>{username}</strong>, por favor escriba el nombre de usuario correspondiente
        </Delete>
    )
}

export default DeleteUser;
