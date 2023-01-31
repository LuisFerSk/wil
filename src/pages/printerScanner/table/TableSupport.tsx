import { lazy, Suspense } from 'react'

import { CircularProgress, Grid, TableCell } from '@mui/material'
import { Modal, Table } from 'components'

import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye';

import { PrinterScannerInterface } from 'interfaces'
import { useFloat } from 'hooks';
import TableMoreMenu from 'components/table/TableMoreMenu';
import { mappingMenuItem } from 'components/table/TableFunctions';

const headLabel = [
    { id: 'license_plate', label: 'Placa', alignRight: false },
    { id: 'serial', label: 'Serial', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'model', label: 'Modelo', alignRight: false },
    { id: '', label: '' }
]

interface Props {
    data: PrinterScannerInterface[]
}

export default function EquipmentTable(props: Props) {
    const PrinterScannerView = lazy(() => import('../view'))

    const { data } = props;

    const modalState = useFloat({ initialState: false })

    function createTableCells(row: PrinterScannerInterface) {
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
                            <PrinterScannerView data={row} />
                        </Suspense>
                    )
                    modalState.open()
                }
            }
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
