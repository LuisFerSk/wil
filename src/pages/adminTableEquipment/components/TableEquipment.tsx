import { lazy, Suspense, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye'
import { Chip, TableCell } from '@mui/material'

import { EquipmentFindResponse } from 'services/models'
import { mappingMenuItem, Table, TableMoreMenu } from 'components'
import { HeadLabelInterface } from 'interfaces'
import { Loader } from 'pages'
import { EquipmentFindAllBlocSuccess } from 'bloc'
import { AdminTableContext } from '../context'
import { STATE_BOOLEAN, TYPE_EQUIPMENT } from 'constants'

interface Props {
    bloc: EquipmentFindAllBlocSuccess
}

const headLabel: HeadLabelInterface<EquipmentFindResponse>[] = [
    { id: 'licensePlate', label: 'Placa', alignRight: false },
    { id: 'serial', label: 'Serial', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'model', label: 'Modelo', alignRight: false },
    { id: 'state', label: 'Estado', alignRight: false },
]

export default function TableEquipment(props: Props) {
    const { bloc } = props;

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
        <Table
            createTableCells={createTableCells}
            headLabel={headLabel}
            data={bloc.state}
            selectBy='licensePlate'
            searchBy='licensePlate'
            optionsSearchBy={[]}
            placeholder='Buscar equipo'
        />
    )
}