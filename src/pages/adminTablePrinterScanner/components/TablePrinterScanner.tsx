import { Suspense, useContext, lazy, useState } from 'react'
import { Chip, CircularProgress, Grid, TableCell } from "@mui/material";
import { useNavigate } from "react-router-dom";
import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye'
import FilterListIcon from '@mui/icons-material/FilterList';

import { PrinterScannerFindAllBlocSuccess } from "bloc";
import { mappingMenuItem, Table, TableFilter, TableMoreMenu } from "components";
import { PrinterScannerFindResponse } from 'services/models';
import { AdminTablePrinterScannerContext } from '../context';
import { GUARANTEE, guaranteeFilterValues, STATE, STATE_BOOLEAN, TYPES_OF_ACQUISITION, TYPES_PRINTER_SCANNER_SELECT } from 'constants';
import { HeadLabelInterface, SelectItemInterface } from 'interfaces';
import { FilterInterface } from 'components/table/TableFilter';
import { filter } from 'lodash';

interface Props {
    bloc: PrinterScannerFindAllBlocSuccess
}

export default function TablePrinterScanner(props: Props) {
    const PrinterScannerDelete = lazy(() => import('./DeletePrinterScanner'))

    const { bloc } = props;

    const [data, setData] = useState(bloc.state)

    const filters: FilterInterface<PrinterScannerFindResponse>[] = [
        {
            id: 'type',
            label: 'Tipo',
            filterOptions: TYPES_PRINTER_SCANNER_SELECT.map((item) => item),
            values: []
        },
        {
            id: 'acquiredBy',
            label: 'Adquirido por',
            filterOptions: TYPES_OF_ACQUISITION.map((item) => item),
            values: []
        },
        {
            id: 'state',
            label: 'Estado',
            filterOptions: STATE.map((item) => item),
            values: []
        },
        {
            id: 'warrantyEndDate',
            label: 'Garantía',
            filterOptions: GUARANTEE.map((item) => item),
            values: []
        },
    ]

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
        <>
            <TableFilter
                title='Filtros'
                icon={<FilterListIcon color='primary' />}
                filters={filters}
                maxColumn={2}
                onChange={(filters) => {
                    const nowDate = new Date()

                    const newData = filter(bloc.state, (state) =>
                        filters.every((strainer) =>
                            strainer.values.length === 0 ||

                            strainer.values.includes(guaranteeFilterValues.withGuarantee) &&
                            state.warrantyEndDate !== null &&
                            new Date(state.warrantyEndDate) > nowDate ||

                            strainer.values.includes(guaranteeFilterValues.noWarranty) &&
                            state.warrantyEndDate !== null &&
                            new Date(state.warrantyEndDate) < nowDate ||

                            strainer.values.includes(state[strainer.id])
                        )
                    )

                    setData(newData)
                }}
            />
            <Table
                createTableCells={createTableCells}
                headLabel={headLabel}
                data={data}
                selectBy='licensePlate'
                searchBy='licensePlate'
                optionsSearchBy={optionsSearchBy}
                placeholder='Buscar impresora o scanner'
            />
        </>
    )
}

const headLabel: HeadLabelInterface<PrinterScannerFindResponse>[] = [
    { id: 'licensePlate', label: 'Placa', alignRight: false },
    { id: 'serial', label: 'Serial', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'model', label: 'Modelo', alignRight: false },
    { id: 'state', label: 'Estado', alignRight: false },
]

const optionsSearchBy: SelectItemInterface<PrinterScannerFindResponse>[] = [
    {
        id: 'licensePlate',
        label: 'Placa'
    },
    {
        id: 'serial',
        label: 'Serial'
    },
]