import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye'
import { Chip, TableCell, } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import { filter } from 'lodash'

import { EquipmentFindResponse } from 'services/models'
import { mappingMenuItem, Table, TableMoreMenu } from 'components'
import { HeadLabelInterface, SelectItemInterface } from 'interfaces'
import { Loader } from 'pages'
import { EquipmentFindAllBlocSuccess } from 'bloc'
import { AdminTableContext } from '../context'
import { GUARANTEE, guaranteeFilterValues, PROCESSOR_TYPES, RAM_MEMORY_TYPES, STATE, STATE_BOOLEAN, TYPE_EQUIPMENT } from 'constants'
import TableFilter, { FilterInterface } from 'components/table/TableFilter'

interface Props {
    bloc: EquipmentFindAllBlocSuccess
}

export default function TableEquipment(props: Props) {
    const { bloc } = props;

    const filters: FilterInterface<EquipmentFindResponse>[] = [
        {
            id: 'processorType',
            label: 'Tipo de procesador',
            filterOptions: PROCESSOR_TYPES.map((item) => item),
            values: []
        },
        {
            id: 'ramMemoryType',
            label: 'Tipo de memoria RAM',
            filterOptions: RAM_MEMORY_TYPES.map((item) => item),
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

    const [data, setData] = useState(bloc.state)

    const adminTableContext = useContext(AdminTableContext)
    const { setTitleModal, setContentModal, openModal, closeModal, openAlert } = adminTableContext;

    const navigate = useNavigate()

    const EquipmentDelete = lazy(() => import('./DeleteEquipment'))

    function createTableCells(row: EquipmentFindResponse) {
        const { id, serial, type, brand, model, licensePlate, state } = row;

        const options = [
            {
                label: 'Ver',
                icon: baselineRemoveRedEye,
                onClick: () => {
                    navigate(`/equipment/view/${id}`)
                }
            },
            {
                label: 'Editar',
                icon: editFill,
                onClick: () => {
                    navigate(`/equipment/update/${id}`)
                }
            },
            {
                label: 'Eliminar',
                icon: trash2Outline,
                onClick: () => {
                    setTitleModal && setTitleModal('Eliminar Equipo')
                    setContentModal && setContentModal(
                        <Suspense fallback={<Loader />}>
                            <EquipmentDelete
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
                <TableCell align='left'>{TYPE_EQUIPMENT[type as keyof typeof TYPE_EQUIPMENT]}</TableCell>
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
                onChange={(filters) => {
                    const nowDate = new Date()

                    const newData = filter(bloc.state, (state) =>
                        filters.every((strainer) =>
                            strainer.values.length === 0 ||

                            strainer.values.includes(guaranteeFilterValues.withGuarantee) &&
                            new Date(state.warrantyEndDate) > nowDate ||

                            strainer.values.includes(guaranteeFilterValues.noWarranty) &&
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
                placeholder='Buscar equipo'
            />
        </>
    )
}

const headLabel: HeadLabelInterface<EquipmentFindResponse>[] = [
    { id: 'licensePlate', label: 'Placa', alignRight: false },
    { id: 'serial', label: 'Serial', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'model', label: 'Modelo', alignRight: false },
    { id: 'state', label: 'Estado', alignRight: false },
]

const optionsSearchBy: SelectItemInterface<EquipmentFindResponse>[] = [
    {
        id: 'licensePlate',
        label: 'Placa'
    },
    {
        id: 'serial',
        label: 'Serial'
    },
]