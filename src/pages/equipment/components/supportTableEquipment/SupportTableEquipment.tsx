import { lazy, Suspense } from 'react'

import { CircularProgress, Grid, TableCell } from '@mui/material'

import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye';

import { Modal, Table } from 'components'
import { mappingMenuItem } from 'components/table/TableFunctions'
import TableMoreMenu from 'components/table/TableMoreMenu'
import { useFloat } from 'hooks'

import { EquipmentInterface } from 'interfaces'

const headLabel = [
    { id: 'license_plate', label: 'Placa', alignRight: false },
    { id: 'serial', label: 'Serial', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'model', label: 'Modelo', alignRight: false },
    { id: '', label: '' }
]

interface Props {
    data: EquipmentInterface[]
}

export default function SupportTableEquipment(props: Props) {
    const EquipmentView = lazy(() => import('../viewEquipment/ViewEquipment'))

    const { data } = props;

    const modalState = useFloat({ initialState: false })

    function createTableCells(row: EquipmentInterface) {
        const { serial, type, brand, model, license_plate } = row;

        const options = [
            {
                label: 'Ver',
                icon: baselineRemoveRedEye,
                onClick: () => {
                    modalState.setTitle('Equipo')
                    modalState.setContent(
                        <Suspense fallback={
                            <Grid textAlign='center'>
                                <CircularProgress color='primary' />
                            </Grid>
                        }>
                            <EquipmentView data={row} />
                        </Suspense>
                    )
                    modalState.open()
                }
            },
        ]

        return (
            <>
                <TableCell align='left'>{license_plate || 'Sin placa'}</TableCell>
                <TableCell align='left'>{serial}</TableCell>
                <TableCell align='left'>{type}</TableCell>
                <TableCell align='left'>{brand.name}</TableCell>
                <TableCell align='left'>{model}</TableCell>
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
                selectBy='license_plate'
                searchBy='license_plate'
                searchByOther='serial'
                placeholder='Buscar por placa o serial'
            />
            <Modal title={modalState.title} isOpen={modalState.isOpen} onClose={modalState.close}>
                {modalState.content as JSX.Element}
            </Modal>
        </>
    )
}
