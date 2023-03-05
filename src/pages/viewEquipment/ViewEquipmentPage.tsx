import { Button, Card, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';

import { typeEquipment } from "interfaces";
import { equipmentFind } from "services/equipment";
import { AuthContext } from "provider/Auth";
import { EquipmentFindBloc, EquipmentFindBlocFailure, EquipmentFindBlocLoading, EquipmentFindBlocSuccess } from "bloc";
import { Loader } from "pages";
import { FLAT, TYPE_EQUIPMENT } from "constants";
import { TryAgain } from "components";

export default function ViewEquipmentPage() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const theme = useTheme();

    const [bloc, setBloc] = useState<EquipmentFindBloc>(new EquipmentFindBlocLoading())

    let { id } = useParams();

    function getEquipment() {
        equipmentFind(token, id)
            .then((response) => {
                setBloc(new EquipmentFindBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new EquipmentFindBlocFailure(error))
            })
    }

    useEffect(() => {
        getEquipment()
    }, [])

    if (bloc instanceof EquipmentFindBlocLoading) {
        return <Loader />
    }

    if (bloc instanceof EquipmentFindBlocSuccess) {
        const data = bloc.state;

        return (
            <Grid container paddingX={2}>
                <Grid
                    item
                    xs={12}
                    container
                    textAlign="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h4" sx={{ mb: 5 }} >Información del equipo</Typography>
                    <Link to={`/equipment/update/${data.id}`}>
                        <Button variant='outlined' color="secondary" endIcon={<EditIcon />}>
                            Editar
                        </Button>
                    </Link>
                </Grid>
                <Grid container item component={Card}>
                    <Grid container item spacing={2} xs={12} md={6} padding={2}>
                        <Grid item xs={12} marginBottom={1}>
                            <Typography variant="subtitle2" color={theme.palette.primary.main}>
                                Información del equipo
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Tipo de equipo
                            </Typography>
                            <Typography variant="body2" >
                                {TYPE_EQUIPMENT[data.type as keyof typeof TYPE_EQUIPMENT]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Marca
                            </Typography>
                            <Typography variant="body2" >
                                {data.brand.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Tipo procesador
                            </Typography>
                            <Typography variant="body2" >
                                {data.processorType}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Modelo de procesador
                            </Typography>
                            <Typography variant="body2" >
                                {data.processorModel}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Modelo del equipo
                            </Typography>
                            <Typography variant="body2" >
                                {data.model}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Serial del equipo
                            </Typography>
                            <Typography variant="body2" >
                                {data.serial}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant="subtitle1" >
                                Serial del monitor
                            </Typography>
                            <Typography variant="body2" >
                                {data.monitorSerial || 'no registrado'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Placa del monitor
                            </Typography>
                            <Typography variant="body2" >
                                {data.monitorLicensePlate || 'no registrado'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Placa
                            </Typography>
                            <Typography variant="body2" >
                                {data.licensePlate || 'no registrado'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2} xs={12} md={6} padding={2}>
                        <Grid item xs={12} marginBottom={1}>
                            <Typography variant="subtitle2" color={theme.palette.primary.main}>
                                Ubicación del equipo
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Sede
                            </Typography>
                            <Typography variant="body2" >
                                {data.campus}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Area
                            </Typography>
                            <Typography variant="body2" >
                                {data.area}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Piso
                            </Typography>
                            <Typography variant="body2" >
                                {FLAT[data.area as keyof typeof FLAT]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color={theme.palette.primary.main}>
                                Información del usuario
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Usuario
                            </Typography>
                            <Typography variant="body2" >
                                {data.user}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Cédula
                            </Typography>
                            <Typography variant="body2" >
                                {data.cc}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Teléfono
                            </Typography>
                            <Typography variant="body2" >
                                {data.phone || 'No registrado'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" color={theme.palette.primary.main}>
                                Estado del equipo
                            </Typography>
                            <Typography variant="body2">
                                {data.state}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        )
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al consultar el equipo.'
            onClick={() => { getEquipment() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}