import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye'
import { Button, Card, Chip, Grid, TableCell, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import { filter } from 'lodash'

import { EquipmentFindResponse } from 'services/models'
import { Accordion, mappingMenuItem, Table, TableMoreMenu } from 'components'
import { HeadLabelInterface, SelectItemInterface } from 'interfaces'
import { Loader } from 'pages'
import { EquipmentFindAllBlocSuccess } from 'bloc'
import { AdminTableContext } from '../context'
import { GUARANTEE, guaranteeFilterValues, PROCESSOR_TYPES, RAM_MEMORY_TYPES, STATE, STATE_BOOLEAN, TYPE_EQUIPMENT } from 'constants'

interface Props {
    bloc: EquipmentFindAllBlocSuccess
}

interface FilterInterface<T extends Record<string, any>> {
    id: keyof T
    values: T[keyof T][]
}

export default function TableEquipment(props: Props) {
    const { bloc } = props;

    const initialFilters: FilterInterface<EquipmentFindResponse>[] = [
        {
            id: 'processorType',
            values: PROCESSOR_TYPES.map((item) => item.value)
        },
        {
            id: 'ramMemoryType',
            values: RAM_MEMORY_TYPES.map((item) => item.value)
        },
        {
            id: 'state',
            values: STATE.map((item) => item.value)
        },
        {
            id: 'warrantyEndDate',
            values: GUARANTEE.map((item) => item.value)
        },
    ]

    const [filters, setFilters] = useState<FilterInterface<EquipmentFindResponse>[]>(initialFilters)

    function handledChangeFilters(id: keyof EquipmentFindResponse, value: EquipmentFindResponse[keyof EquipmentFindResponse]) {
        const found = filters.find((item) => item.values.includes(value))

        if (!found) {
            const newFilter = filters.map((item) => {
                if (item.id === id) {
                    item.values = [...item.values, value]
                }

                return item;
            })

            setFilters(newFilter)
            return;
        }

        const newFilter = filters.map((item) => {
            const { values } = item

            const indexValue = values.indexOf(value)

            if (indexValue >= 0) {
                values.splice(indexValue, 1)
            }

            return item;
        })

        setFilters(newFilter)
    }

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

    const Accordions = [
        {
            title: 'Filtros',
            icon: <FilterListIcon color='primary' />,
            content: (
                <Grid container spacing={2}>
                    <Grid item md={12} container spacing={2}>
                        <Grid item md={6} >
                            <Button
                                fullWidth
                                color='inherit'

                                variant='outlined'
                                onClick={() => {
                                    setFilters(initialFilters)
                                }}
                            >
                                Seleccionar todos
                            </Button>
                        </Grid>
                        <Grid item md={6} >
                            <Button
                                fullWidth
                                color='inherit'
                                variant='outlined'
                                onClick={() => {
                                    const newFilters = filters.map((item) => {
                                        item.values = []
                                        return item;
                                    })

                                    setFilters(newFilters)
                                }}
                            >
                                Limpiar filtros
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <Grid item md={12}>
                            <Typography variant='body2' >Tipo de procesador</Typography>
                        </Grid>
                        <Grid item md={12} container spacing={2}>
                            {PROCESSOR_TYPES.map((options) => {
                                let gridSize = 12 / PROCESSOR_TYPES.length;

                                if (gridSize % 1 !== 0) {
                                    gridSize += 1;
                                }

                                return (
                                    <Grid item xs={12} md={gridSize} >
                                        <Button
                                            fullWidth
                                            variant={filters.find((item) => item.values.includes(options.value)) ? 'contained' : 'outlined'}
                                            onClick={() => {
                                                handledChangeFilters('processorType', options.value)
                                            }}
                                        >
                                            {options.label}
                                        </Button>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <Grid item md={12}>
                            <Typography variant='body2' >Tipo de memoria</Typography>
                        </Grid>
                        <Grid item md={12} container spacing={2}>
                            {RAM_MEMORY_TYPES.map((options) =>
                                <Grid item md={4} >
                                    <Button
                                        fullWidth
                                        variant={filters.find((item) => item.values.includes(options.value)) ? 'contained' : 'outlined'}
                                        onClick={() => {
                                            handledChangeFilters('ramMemoryType', options.value)
                                        }}
                                    >
                                        {options.label}
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <Grid item md={12}>
                            <Typography variant='body2' >Estado</Typography>
                        </Grid>
                        <Grid item md={12} container spacing={2}>
                            {STATE.map((options) =>
                                <Grid item md={6} >
                                    <Button
                                        fullWidth
                                        variant={filters.find((item) => item.values.includes(options.value)) ? 'contained' : 'outlined'}
                                        onClick={() => {
                                            handledChangeFilters('state', options.value)
                                        }}
                                    >
                                        {options.label}
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <Grid item md={12}>
                            <Typography variant='body2' >Garantía</Typography>
                        </Grid>
                        <Grid item md={12} container spacing={2}>
                            {GUARANTEE.map((options) =>
                                <Grid item md={6} >
                                    <Button
                                        fullWidth
                                        variant={filters.find((item) => item.values.includes(options.value)) ? 'contained' : 'outlined'}
                                        onClick={() => {
                                            handledChangeFilters('warrantyEndDate', options.value)
                                        }}
                                    >
                                        {options.label}
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid >
            )
        }
    ]

    useEffect(() => {
        const nowDate = new Date()

        const newData = filter(bloc.state, (state) =>
            filters.every((strainer) =>
                strainer.id === 'warrantyEndDate' &&
                strainer.values.includes(guaranteeFilterValues.withGuarantee) &&
                new Date(state.warrantyEndDate) > nowDate ||
                strainer.values.includes(guaranteeFilterValues.noWarranty) &&
                new Date(state.warrantyEndDate) < nowDate ||
                strainer.values.includes(state[strainer.id])
            )
        )

        setData(newData)
    }, [filters])

    return (
        <>
            <Card sx={{ marginBottom: 3 }}>
                <Accordion accordions={Accordions} />
            </Card>
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