import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import { TableCell } from '@mui/material'
import { FloatAlert, Modal, Table } from 'components'
import { mappingMenuItem } from 'components/table/TableFunctions'
import TableMoreMenu from 'components/table/TableMoreMenu'
import { useFloat } from 'hooks'
import { HeadLabelInterface, TableDataInterface, TableOptionsInterface, MaintenanceInterface } from 'interfaces'
import MaintenanceDelete from '../delete'
import MaintenanceUpdate from '../update'

const headLabel: HeadLabelInterface[] = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'equipment_user', label: 'Usurio', alignRight: false },
    { id: 'equipment', label: 'Equipo', alignRight: false },
    { id: '', label: '' }
]

export default function MaintenanceTable(props: TableDataInterface<MaintenanceInterface>): JSX.Element {
    const { data, setData } = props;

    const modalState = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente el mantenimiento!'
    })


    function createTableCells(row: MaintenanceInterface): JSX.Element {
        const { id, equipment_user, equipment } = row;

        const options: TableOptionsInterface[] = [
            {
                label: 'Editar',
                icon: editFill,
                onClick: () => {
                    modalState.setTitle('Actualizar Usuario')
                    modalState.setContent(
                        <MaintenanceUpdate
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
                        <MaintenanceDelete
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
                <TableCell align='left'>{id}</TableCell>
                <TableCell align='left'>{equipment_user.name}</TableCell>
                <TableCell align='left'>{equipment.license_plate}</TableCell>
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
