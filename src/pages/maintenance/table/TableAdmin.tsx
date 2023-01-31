import { lazy, Suspense } from 'react'

import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye';
import trash2Outline from '@iconify/icons-eva/trash-2-outline'

import { CircularProgress, Grid, TableCell } from '@mui/material'

import { FloatAlert, Modal, Table } from 'components'
import { mappingMenuItem } from 'components/table/TableFunctions'
import TableMoreMenu from 'components/table/TableMoreMenu'
import { useFloat } from 'hooks'
import { TableDataInterface, MaintenanceInterface } from 'interfaces'

const headLabel = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'equipment', label: 'Equipo', alignRight: false },
    { id: 'date', label: 'Fecha', alignRight: false },
    { id: '', label: '' }
]

type TableType = MaintenanceInterface;

export default function MaintenanceTable(props: TableDataInterface<TableType>) {
    const MaintenanceView = lazy(() => import('../view'));
    const MaintenanceDelete = lazy(() => import('../delete'));

    const { data, setData } = props;

    const modalState = useFloat({ initialState: false })

    const alertState = useFloat({
        initialState: false,
        initialContent: '¡Se ha eliminado correctamente el mantenimiento!'
    })

    function createTableCells(row: TableType) {
        const { id, equipment, date } = row;

        const options = [
            {
                label: 'Ver',
                icon: baselineRemoveRedEye,
                onClick: () => {
                    modalState.setTitle(`Mantenimiento ${row.id}`)
                    modalState.setContent(
                        <Suspense fallback={
                            <Grid textAlign='center'>
                                <CircularProgress color='success' />
                            </Grid>
                        }>
                            <MaintenanceView data={row} />
                        </Suspense>
                    )
                    modalState.open()
                }
            },
            {
                label: 'Eliminar',
                icon: trash2Outline,
                onClick: () => {
                    modalState.setTitle('Eliminar mantenimiento')
                    modalState.setContent(
                        <Suspense fallback={
                            <Grid textAlign='center'>
                                <CircularProgress color='success' />
                            </Grid>
                        }>
                            <MaintenanceDelete
                                data={row}
                                setData={setData}
                                closeModal={modalState.close}
                                openAlert={alertState.open}
                            />
                        </Suspense>
                    )
                    modalState.open()
                }
            },
        ]


        return (
            <>
                <TableCell align='left'>{id}</TableCell>
                <TableCell align='left'>{equipment.license_plate || 'No registrado'}</TableCell>
                <TableCell align='left'>{date.split('T')[0]}</TableCell>
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
                {modalState.content as JSX.Element}
            </Modal>
            <FloatAlert isOpen={alertState.isOpen} close={alertState.close} severity="success">
                {alertState.content as JSX.Element}
            </FloatAlert>
        </>
    )
}
