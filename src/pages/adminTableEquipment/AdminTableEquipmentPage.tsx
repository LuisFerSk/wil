import { Box, Button, Grid, Typography } from '@mui/material'
import { useContext, } from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';

import { EquipmentFindAllBlocSuccess, EquipmentFindAllBlocLoading } from 'bloc'
import { TableEquipment } from './components'
import { AdminTableContext } from './context'
import { Loader } from 'pages/'
import { TryAgain } from 'components';

export default function AdminTableEquipmentPage() {
    const adminTableContext = useContext(AdminTableContext)
    const { equipmentsBloc, getEquipments } = adminTableContext;

    if (equipmentsBloc instanceof EquipmentFindAllBlocSuccess) {
        return (
            <Grid container spacing={3} paddingX={2}>
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="space-between"
                >
                    <Typography variant='h4' sx={{ mb: 1 }}>Equipos</Typography>
                    <Link to='/equipment/register'>
                        <Button variant='outlined' color='secondary' endIcon={<AddIcon />}>
                            Agregar
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <TableEquipment bloc={equipmentsBloc} />
                    </Box>
                </Grid>
            </Grid>
        )
    }

    if (equipmentsBloc instanceof EquipmentFindAllBlocLoading) {
        return <Loader />
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al consultar los equipos.'
            onClick={() => { getEquipments && getEquipments() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}
