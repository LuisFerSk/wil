import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import formTextboxPassword from '@iconify/icons-mdi/form-textbox-password';
import accountLock from '@iconify/icons-mdi/account-lock';
import accountLockOpen from '@iconify/icons-mdi/account-lock-open';

import { Chip, TableCell } from '@mui/material'

import Table from 'components/table'
import { mappingMenuItem } from 'components/table/TableFunctions'
import TableMoreMenu from 'components/table/TableMoreMenu'
import { TableDataInterface, TableOptionsInterface, UsuarioInterface } from 'interfaces'
import useFloat from 'hooks/float';
import ChangePassword from '../changePassword';
import Modal from 'components/modal';
import { authContext } from 'provider/Auth';
import { useContext } from 'react';
import { logDownloadExcel } from 'api/log';
import { usuarioDisable, usuarioEnable } from 'api/usuario';
import { FloatAlert } from 'components';
import { updateDataInArray } from 'utils';
import DeleteUser from '../eliminar';

const headLabel = [
    { id: 'username', label: 'Nombre de usuario', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
    { id: '', }
]


function EquipmentTable(props: TableDataInterface<UsuarioInterface>): JSX.Element {
    const { data, setData } = props

    const modalState = useFloat({ initialState: false })
    const alertState = useFloat({ initialState: false })

    const authsContext = useContext(authContext)
    const { token } = authsContext;

    function onDownload() {

        logDownloadExcel(token)
            .then(result => {
                if (result.status === 404) {
                    alertState.setContent('No se encontraron datos para generar el registro log.')
                    alertState.setSeverity('warning')
                    alertState.open()
                    return;
                }

                if (result.status !== 200) {
                    alertState.setContent('Ha sucedido un error al generar el registro log.')
                    alertState.setSeverity('error')
                    alertState.open()
                    return;
                }

                alertState.setContent('Se ha generado el registro log correctamente.')
                alertState.setSeverity('success')
                alertState.open()
                return;

            })
    }

    function createTableCells(row: UsuarioInterface): JSX.Element {
        const { id, username, estado, id_estado } = row;

        const options: TableOptionsInterface[] = [
            {
                label: 'Cambiar contraseña', icon: formTextboxPassword, onClick: () => {
                    modalState.setTitle(`Cambiar contraseña de ${username}`)
                    modalState.setContent(
                        <ChangePassword id={id} />
                    )
                    modalState.open()
                }
            },
            id_estado === "3" ? {
                label: 'Deshabilitar', icon: accountLock, onClick: () => {
                    usuarioDisable(id, token)
                        .then((result) => {
                            if (result.status === 200) {
                                setData((old) => updateDataInArray<UsuarioInterface>(old, id, result.data.data))
                                alertState.setContent('El usuario se ha deshabilitado')
                                alertState.setSeverity('error')
                                alertState.open()
                                return
                            }

                            alertState.setContent(result.data.message)
                            alertState.setSeverity('error')
                            alertState.open()
                        })
                }
            } : {
                label: 'Habilitar', icon: accountLockOpen, onClick: () => {
                    usuarioEnable(id, token)
                        .then((result) => {
                            if (result.status === 200) {
                                setData((old) => updateDataInArray<UsuarioInterface>(old, id, result.data.data))
                                alertState.setContent('El usuario se ha habilitado')
                                alertState.setSeverity('success')
                                alertState.open()
                            }
                        })

                }
            },
            {
                label: 'Eliminar', icon: trash2Outline, onClick: () => {
                    modalState.setTitle('Eliminar usuario')
                    alertState.setContent('El usuario se ha eliminado')
                    modalState.setContent(
                        <DeleteUser
                            data={row}
                            setData={setData}
                            openAlert={alertState.open}
                            closeModal={modalState.close}
                        />
                    )
                    modalState.open()
                }
            },
        ]

        return (
            <>
                <TableCell align='left'>{username}</TableCell>
                <TableCell align='left'>
                    <Chip label={estado} size="small" color={id_estado === "3" ? 'secondary' : 'error'} />
                </TableCell>
                <TableCell padding='checkbox'>
                    <TableMoreMenu>
                        {mappingMenuItem(options)}
                    </TableMoreMenu>
                </TableCell>
            </>
        )
    }

    return (
        <>
            <Table
                createTableCells={createTableCells}
                headLabel={headLabel}
                data={data}
                selectBy='username'
                searchBy='username'
                download={true}
                onDownload={() => onDownload()}
                downloadText="Descargar registro log"
            />
            <Modal title={modalState.title} isOpen={modalState.isOpen} onClose={modalState.close}>
                <>
                    {modalState.content}
                </>
            </Modal>
            <FloatAlert isOpen={alertState.isOpen} close={alertState.close} severity={alertState.severity}>
                {alertState.content as JSX.Element}
            </FloatAlert>
        </>
    )
}

export default EquipmentTable;
