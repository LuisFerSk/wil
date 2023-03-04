import { useContext, useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material';

import { Loader } from 'pages';
import { AuthContext } from 'provider/Auth';
import { EquipmentFindAllBloc, EquipmentFindAllBlocFailure, EquipmentFindAllBlocLoading, EquipmentFindAllBlocSuccess } from 'bloc';
import { equipmentFindAll } from 'services/equipment';
import { TableSupportEquipment } from './components';
import { TryAgain } from 'components';

export default function SupportTableEquipment() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [bloc, setBloc] = useState<EquipmentFindAllBloc>(new EquipmentFindAllBlocLoading())

    function get() {
        equipmentFindAll(token)
            .then((response) => {
                setBloc(new EquipmentFindAllBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new EquipmentFindAllBlocFailure(error))
            })
    }

    useEffect(() => { get() }, [])

    if (bloc instanceof EquipmentFindAllBlocSuccess) {
        return (
            <Grid container spacing={3} paddingX={2}>
                <Grid
                    item
                    xs={12}
                    container
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant='h3' >Equipos</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <TableSupportEquipment bloc={bloc} />
                    </Box>
                </Grid>
            </Grid>
        )
    }

    if (bloc instanceof EquipmentFindAllBlocLoading) {
        return <Loader height='100%' />
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al consultar los equipos.'
            onClick={() => { get() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}
