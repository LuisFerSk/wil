import { lazy, Suspense, useContext } from 'react'
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye';
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import { CircularProgress, Grid, TableCell } from '@mui/material'

import { Table, TryAgain, TableMoreMenu, mappingMenuItem } from 'components'
import { MaintenanceFindResponse } from 'services/models';
import { MaintenanceContext } from 'pages/maintenance/context';
import { MaintenanceFindAllBlocLoading, MaintenanceFindAllBlocSuccess } from 'bloc';
import { Loader } from 'pages';
import { AuthContext } from 'provider/Auth';
import { ROLES } from 'constants';
import { useNavigate } from 'react-router-dom';
import { HeadLabelInterface } from 'interfaces';

export default function TableMaintenance() {
    const maintenanceContext = useContext(MaintenanceContext)
    const { bloc, getMaintenances, setTitleModal, setContentModal, openModal } = maintenanceContext;

    const MaintenanceDelete = lazy(() => import('../deleteMaintenance/DeleteMaintenance'));

    const authContext = useContext(AuthContext)
    const { user } = authContext;

    const navigate = useNavigate()

    function createTableCells(row: MaintenanceFindResponse) {
        const { id, equipment, date } = row;

        let options = [
            {
                label: 'Ver',
                icon: baselineRemoveRedEye,
                onClick: () => {
                    navigate(`/maintenance/view/${id}`)
                }
            },
        ]

        if (user?.role === ROLES.administrator) {
            options = [
                ...options,
                {
                    label: 'Eliminar',
                    icon: trash2Outline,
                    onClick: () => {
                        setTitleModal && setTitleModal('Eliminar mantenimiento')
                        setContentModal && setContentModal(
                            <Suspense fallback={
                                <Grid textAlign='center'>
                                    <CircularProgress color='success' />
                                </Grid>
                            }>
                                <MaintenanceDelete data={row} />
                            </Suspense>
                        )
                        openModal && openModal()
                    }
                },
            ]
        }

        return (
            <>
                <TableCell align='left'>{id}</TableCell>
                <TableCell align='left'>{equipment.licensePlate || 'No registrado'}</TableCell>
                <TableCell align='left'>{date.split('T')[0]}</TableCell>
                <TableCell padding='checkbox'>
                    <TableMoreMenu>
                        {mappingMenuItem(options)}
                    </TableMoreMenu>
                </TableCell>
            </>
        )
    }

    if (bloc instanceof MaintenanceFindAllBlocSuccess) {
        return (
            <Table
                createTableCells={createTableCells}
                headLabel={headLabel}
                data={bloc.state}
                selectBy='id'
                searchBy='id'
                placeholder='Buscar por id'
            />
        )

    }

    if (bloc instanceof MaintenanceFindAllBlocLoading) {
        <Loader />
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al consultar las impresoras y scanner.'
            onClick={() => { getMaintenances && getMaintenances() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}

const headLabel: HeadLabelInterface<MaintenanceFindResponse>[] = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'equipment', label: 'Equipo', alignRight: false },
    { id: 'date', label: 'Fecha', alignRight: false },
]