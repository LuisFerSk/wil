import formTextboxPassword from '@iconify/icons-mdi/form-textbox-password';
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import { TableCell } from '@mui/material'
import { FloatAlert, Modal, Table, ChangePassword } from 'components'
import { mappingMenuItem } from 'components/table/TableFunctions'
import TableMoreMenu from 'components/table/TableMoreMenu'
import { useFloat } from 'hooks'
import { HeadLabelInterface, TableDataInterface, TableOptionsInterface, SupportInterface } from 'interfaces'
import SupportDelete from '../delete'


const headLabel: HeadLabelInterface[] = [
    { id: 'username', label: 'Nombre de usuario', alignRight: false },
    { id: '', label: '' }
]

export default function SupportTable(props: TableDataInterface<SupportInterface>): JSX.Element {
    const { data, setData } = props;

    const modalState = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente el funcionario!'
    })


    function createTableCells(row: SupportInterface): JSX.Element {
        const { id, username } = row;

        const options: TableOptionsInterface[] = [
            {
                label: 'Cambiar contraseña',
                icon: formTextboxPassword,
                onClick: () => {
                    modalState.setTitle(`Cambiar contraseña de ${username}`)
                    modalState.setContent(
                        <ChangePassword id={id} />
                    )
                    modalState.open()
                }
            },
            {
                label: 'Eliminar',
                icon: trash2Outline,
                onClick: () => {
                    modalState.setTitle('Eliminar Soporte')
                    modalState.setContent(
                        <SupportDelete
                            data={row}
                            setData={setData}
                            closeModal={modalState.close}
                            openAlert={alertState.open}
                        />
                    )
                    modalState.open()
                }
            },
        ]


        return (
            <>
                <TableCell align='left'>{username}</TableCell>
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
                placeholder='Buscar por nombre de usuario'
            />
            <Modal title={modalState.title} isOpen={modalState.isOpen} onClose={modalState.close}>
                <>
                    {modalState.content}
                </>
            </Modal>
            <FloatAlert isOpen={alertState.isOpen} close={alertState.close} severity="success">
                {alertState.content as JSX.Element}
            </FloatAlert>
        </>
    )
}
