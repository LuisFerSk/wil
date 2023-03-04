import { useContext, Suspense, lazy } from 'react'
import formTextboxPassword from '@iconify/icons-mdi/form-textbox-password';
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import { CircularProgress, Grid, TableCell } from '@mui/material'

import { Table, TryAgain } from 'components'
import { mappingMenuItem } from 'components/table/TableFunctions'
import TableMoreMenu from 'components/table/TableMoreMenu'
import { SupportContext } from 'pages/support/context';
import { SupportFindAllBlocLoading, SupportFindAllBlocSuccess } from 'bloc';
import { SupportFindResponse } from 'services/models';
import Loader from 'pages/loader/Loader';

export default function TableSupport() {
    const supportContext = useContext(SupportContext)
    const { bloc, getSupports } = supportContext;

    if (bloc instanceof SupportFindAllBlocSuccess) {
        return (
            <_TableSupport data={bloc.state} />
        )
    }

    if (bloc instanceof SupportFindAllBlocLoading) {
        <Loader />
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al consultar los soportes.'
            onClick={() => { getSupports && getSupports() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}

interface Props {
    data: SupportFindResponse[]
}

function _TableSupport(props: Props) {
    const headLabel = [
        { id: 'username', label: 'Nombre de usuario', alignRight: false },
        { id: '', label: '' }
    ]

    return (
        <Table
            createTableCells={createTableCells}
            headLabel={headLabel}
            data={props.data}
            selectBy='username'
            searchBy='username'
            placeholder='Buscar por nombre de usuario'
        />
    )
}

function createTableCells(row: SupportFindResponse) {
    const { id, username } = row;

    const supportContext = useContext(SupportContext)
    const { setContentModal, setTitleModal, openModal } = supportContext;

    const SupportDelete = lazy(() => import('../deleteSupport/DeleteSupport'))
    const ChangePassword = lazy(() => import('components/changePassword/ChangePassword'))

    const options = [
        {
            label: 'Cambiar contraseña',
            icon: formTextboxPassword,
            onClick: () => {
                setTitleModal && setTitleModal(`Cambiar contraseña de ${username}`)
                setContentModal && setContentModal(
                    <ChangePassword id={id} />
                )
                openModal && openModal()
            }
        },
        {
            label: 'Eliminar',
            icon: trash2Outline,
            onClick: () => {
                setTitleModal && setTitleModal('Eliminar Soporte')
                setContentModal && setContentModal(
                    <Suspense fallback={
                        <Grid textAlign='center'>
                            <CircularProgress color='success' />
                        </Grid>
                    }>
                        <SupportDelete data={row} />
                    </Suspense>

                )
                openModal && openModal()
            }
        },
    ]

    return (
        <>
            <TableCell align='left'>{username}</TableCell>
            <TableCell padding='checkbox'>
                <TableMoreMenu>
                    {mappingMenuItem(options)}
                </TableMoreMenu>
            </TableCell>
        </>
    )
}
