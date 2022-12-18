import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'

import { TableCell } from '@mui/material'
import { FloatAlert, Modal, Table } from 'components'
import { mappingMenuItem } from 'components/table/TableFunctions'
import TableMoreMenu from 'components/table/TableMoreMenu'
import { useFloat } from 'hooks'
import { HeadLabelInterface, TableDataInterface, TableOptionsInterface, UserInterface } from 'interfaces'
import UserDelete from '../delete'
import UserUpdate from '../update'

const headLabel: HeadLabelInterface[] = [
    { id: 'cc', label: 'Cédula', alignRight: false },
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'phone', label: 'Teléfono', alignRight: false },
    { id: '', label: '' }
]

export default function UserTable(props: TableDataInterface<UserInterface>): JSX.Element {
    const { data, setData } = props;

    const modalState = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente el funcionario!'
    })


    function createTableCells(row: UserInterface): JSX.Element {
        const { cc, name, phone } = row;

        const options: TableOptionsInterface[] = [
            {
                label: 'Editar',
                icon: editFill,
                onClick: () => {
                    modalState.setTitle('Actualizar Usuario')
                    modalState.setContent(
                        <UserUpdate
                            setData={setData}
                            initData={row}
                        />
                    )
                    modalState.open()
                }
            },
            {
                label: 'Eliminar',
                icon: trash2Outline,
                onClick: () => {
                    modalState.setTitle('Eliminar Usuario')
                    modalState.setContent(
                        <UserDelete
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
                <TableCell align='left'>{cc}</TableCell>
                <TableCell align='left'>{name}</TableCell>
                <TableCell align='left'>{phone}</TableCell>
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
                selectBy='cc'
                searchBy='cc'
                placeholder='Buscar por cédula'
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
