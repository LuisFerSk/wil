import { Suspense, useContext, lazy } from 'react'
import { Chip, CircularProgress, Grid, TableCell } from "@mui/material";
import { useNavigate } from "react-router-dom";
import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye'

import { PrinterScannerFindAllBlocSuccess } from "bloc";
import { mappingMenuItem, Table, TableMoreMenu } from "components";
import { PrinterScannerFindResponse } from 'services/models';
import { AdminTablePrinterScannerContext } from '../context';
import { STATE_BOOLEAN } from 'constants';

interface Props {
    bloc: PrinterScannerFindAllBlocSuccess
}

const headLabel = [
    { id: 'licensePlate', label: 'Placa', alignRight: false },
    { id: 'serial', label: 'Serial', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'model', label: 'Modelo', alignRight: false },
    { id: 'active', label: 'Estado', alignRight: false },
    { id: '', label: '' }
]

export default function TablePrinterScanner(props: Props) {
    const PrinterScannerDelete = lazy(() => import('./DeletePrinterScanner'))

    const { bloc } = props;

    const navigate = useNavigate()

    const adminTablePrinterScannerContext = useContext(AdminTablePrinterScannerContext)
    const { setTitleModal, setContentModal, openModal, closeModal, openAlert } = adminTablePrinterScannerContext;

    function createTableCells(row: PrinterScannerFindResponse) {
        const { id, serial, type, brand, model, state, licensePlate } = row;

        const options = [
            {
                label: 'Ver',
                icon: baselineRemoveRedEye,
                onClick: () => {
                    navigate(`/printer-scanner/view/${id}`)
                }
            },
            {
                label: 'Editar',
                icon: editFill,
                onClick: () => {
                    navigate(`/printer-scanner/update/${id}`)
                }
            },
            {
                label: 'Eliminar',
                icon: trash2Outline,
                onClick: () => {
                    setTitleModal && setTitleModal('Eliminar Impresora o scanner')
                    setContentModal && setContentModal(
                        <Suspense fallback={
                            <Grid textAlign='center'>
                                <CircularProgress color='primary' />
                            </Grid>
                        }>
                            <PrinterScannerDelete
                                data={row}
                                closeModal={closeModal}
                                openAlert={openAlert}
                            />
                        </Suspense>
                    )
                    openModal && openModal()
                }
            },
        ]

        return (
            <>
                <TableCell align='left'>{licensePlate || 'Sin placa'}</TableCell>
                <TableCell align='left'>{serial}</TableCell>
                <TableCell align='left'>{type}</TableCell>
                <TableCell align='left'>{brand.name}</TableCell>
                <TableCell align='left'>{model}</TableCell>
                <TableCell align='left'>
                    {STATE_BOOLEAN[state as keyof typeof STATE_BOOLEAN] ?
                        <Chip label="Activo" color='primary' size="small" />
                        :
                        <Chip label="Inactivo" variant="outlined" color='error' size="small" />
                    }
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
        <Table
            createTableCells={createTableCells}
            headLabel={headLabel}
            data={bloc.state}
            selectBy='licensePlate'
            searchBy='licensePlate'
            searchByOther='serial'
            placeholder='Buscar por placa o serial'
        />
    )
}