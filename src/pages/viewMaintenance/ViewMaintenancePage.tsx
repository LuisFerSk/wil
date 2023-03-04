import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, Checkbox, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography, useTheme } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

import { AuthContext } from "provider/Auth";
import { maintenanceFind } from "services/maintenance";
import styles from './style.module.css'
import { MaintenanceFindBloc, MaintenanceFindBlocFailure, MaintenanceFindBlocLoading, MaintenanceFindBlocSuccess } from "bloc";
import { Loader } from "pages";
import { TryAgain } from "components";

export default function ViewMaintenancePage() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const theme = useTheme()

    let { id } = useParams();

    const [bloc, setBloc] = useState<MaintenanceFindBloc>(new MaintenanceFindBlocLoading())

    function get() {
        id && maintenanceFind(token, id)
            .then((response) => {
                setBloc(new MaintenanceFindBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new MaintenanceFindBlocFailure(error))
            })
    }

    useEffect(() => { get() }, [])

    if (bloc instanceof MaintenanceFindBlocLoading) {
        return <Loader />
    }

    if (bloc instanceof MaintenanceFindBlocSuccess) {
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
                    <Typography variant="h4" sx={{ mb: 5 }} >Información de la impresora o scanner</Typography>
                    <Link to={'/maintenance'}>
                        <Button variant='outlined' endIcon={<AssignmentIcon />}>
                            Volver al registro
                        </Button>
                    </Link>
                </Grid>
                <Grid container item component={Card}>
                    <Grid container item spacing={2} padding={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                1. Actividades iniciales.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" >
                                Usuario:
                                <Typography variant="body2" >
                                    {data.user.username}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" >
                                Equipo:
                                <Typography variant="body2" >
                                    {`${data.equipment.type} - ${data.equipment.brand.name} ${data.equipment.model} - serial: ${data.equipment.serial}`}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" >
                                Ciudad:
                                <Typography variant="body2" >
                                    {data.city}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" >
                                Fecha:
                                <Typography variant="body2" >
                                    {data.date.split('T')[0]}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                2. Verificación de funcionamiento.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={Boolean(data.ignitionStation)} disabled />} label="Encendido estación" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.operatingSystemBoot)} disabled />} label="Arranque del SO" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.HDD)} disabled />} label="Disco duro" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.cdRomDvd)} disabled />} label="CD Rom y/o DVD" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.display)} disabled />} label="Monitor" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.mouse)} disabled />} label="Mouse" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.keyboard)} disabled />} label="Teclado" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="subtitle2" >
                                Descripción de error encontrado o reportado
                                <Typography variant="body2" >
                                    {data.errorDescription || 'No registrado'}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" >
                                3. Limpieza física.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={Boolean(data.removeIndoorDust)} disabled />} label="Remover polvo interno sin desconectar tarjetas" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.checkInternalConnections)} disabled />} label="Verificar conexiones internas" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.connectPowerPeripheralCables)} disabled />} label="Conectar cables de potencia y periféricos" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.closePcCleanCase)} disabled />} label="Cerrar CPU y limpiar carcaza" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={Boolean(data.cleanKeyboard)} disabled />} label="Limpiar teclado" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.cleanMonitor)} disabled />} label="Limpiar monitor" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.cleanMouse)} disabled />} label="Limpiar mouse (esfera y rodillo)" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" >
                                4. Verificación final de funcionamiento.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={Boolean(data.ignitionStation)} disabled />} label="Encendido estación" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.operatingSystemBoot)} disabled />} label="Arranque del SO" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.endHdd)} disabled />} label="Disco duro" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.endCdRomDvd)} disabled />} label="CD Rom y/o DVD" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.endDisplay)} disabled />} label="Monitor" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.endMouse)} disabled />} label="Mouse" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.endKeyboard)} disabled />} label="Teclado" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="subtitle2" >
                                Descripción de error encontrado o reportado
                                <Typography variant="body2" >
                                    {data.endErrorDescription || 'No registrado'}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" >
                                5. mantenimiento de software.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={Boolean(data.checkAntiVirus)} disabled />} label="Verificación antivirus" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.deletionTemporaryCookies)} disabled />} label="Eliminación de temporales y cookies" />
                                <FormControlLabel control={<Checkbox checked={Boolean(data.diskDefragmentation)} disabled />} label="Desfragmentar disco duro" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" >
                                6. Actividades finales.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={Boolean(data.equipmentDelivery)} disabled />} label="Entrega del equipo al usuario" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" >
                                7. Encuesta.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                7.1. ¿Cual es el nivel de satisfacción con el servicio recibido?
                            </Typography>
                            <FormGroup>
                                <RadioGroup value={data.question_1} row>
                                    <FormControlLabel value="buena" control={<Radio disabled />} label="Buena" />
                                    <FormControlLabel value="regular" control={<Radio disabled />} label="Regular" />
                                    <FormControlLabel value="malo" control={<Radio disabled />} label="Malo" />
                                </RadioGroup>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                7.2. ¿Como califica la atención brindada por el soporte?
                            </Typography>
                            <FormGroup>
                                <RadioGroup value={data.question_2} row>
                                    <FormControlLabel value="buena" control={<Radio disabled />} label="Buena" />
                                    <FormControlLabel value="regular" control={<Radio disabled />} label="Regular" />
                                    <FormControlLabel value="malo" control={<Radio disabled />} label="Malo" />
                                </RadioGroup>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                7.3. ¿Cual es su percepción sobre la capacitación del personal que realizo las actividades de mantenimiento?
                            </Typography>
                            <FormGroup>
                                <RadioGroup value={data.question_3} row>
                                    <FormControlLabel value="buena" control={<Radio disabled />} label="Buena" />
                                    <FormControlLabel value="regular" control={<Radio disabled />} label="Regular" />
                                    <FormControlLabel value="malo" control={<Radio disabled />} label="Malo" />
                                </RadioGroup>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" >
                                Observaciones
                                <Typography variant="body2" >
                                    {data.observations || 'No registrado'}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{
                                borderBottom: 1,
                                backgroundColor: theme.palette.grey[100],
                                borderRadius: '7px 7px 0px 0px'
                            }} >
                                <img className={styles.sigPad} src={`${import.meta.env.VITE_BACKEND_URL}${data.signature}`} />
                            </Box>
                            <Typography>
                                Firma del usuario
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al consultar el mantenimiento.'
            onClick={() => { get() }}
        >
            volver a intentarlo
        </TryAgain >
    )

}