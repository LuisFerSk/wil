import { Box, Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, Radio, RadioGroup, Stack, TextField, Typography, useTheme } from "@mui/material";
import { MaintenanceInterface } from "interfaces";
import styles from './style.module.css'


interface MaintenanceViewProps {
    data: MaintenanceInterface
}

export default function MaintenanceView(props: MaintenanceViewProps): JSX.Element {
    const theme = useTheme()
    const { data } = props;
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle2" >
                    1. Actividades iniciales.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={data.equipment_user.name}
                    fullWidth
                    label="Usuario"
                    disabled
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={`${data.equipment.type} - ${data.equipment.brand.name} ${data.equipment.model} - placa: ${data.equipment.license_plate}`}
                    fullWidth
                    disabled
                    label="Ciudad"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={data.city}
                    fullWidth
                    disabled
                    label="Ciudad"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={data.campus}
                    fullWidth
                    disabled
                    label="Sede"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    value={data.date.split('T')[0]}
                    disabled
                    fullWidth
                    type='date'
                    label="Fecha"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={9}>
                <TextField
                    value={data.workstation}
                    disabled
                    fullWidth
                    label="Estación de trabajo"
                    variant="outlined" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" >
                    2. Verificación de funcionamiento.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={Boolean(data.ignition_station)} disabled />} label="Encendido estación" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.operating_system_boot)} disabled />} label="Arranque del SO" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.HDD)} disabled />} label="Disco duro" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.CD_rom_DVD)} disabled />} label="CD Rom y/o DVD" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.display)} disabled />} label="Monitor" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.mouse)} disabled />} label="Mouse" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.keyboard)} disabled />} label="Teclado" />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={8}>
                <TextField
                    value={data.error_description}
                    disabled
                    fullWidth
                    label="Descripción de error encontrado o reportado"
                    variant="outlined"
                    multiline
                    rows={11}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" >
                    3. Limpieza física.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={Boolean(data.remove_indoor_dust)} disabled />} label="Remover polvo interno sin desconectar tarjetas" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.check_internal_connections)} disabled />} label="Verificar conexiones internas" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.connect_power_peripheral_cables)} disabled />} label="Conectar cables de potencia y periféricos" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.close_PC_clean_case)} disabled />} label="Cerrar CPU y limpiar carcaza" />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={Boolean(data.clean_keyboard)} disabled />} label="Limpiar teclado" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.clean_monitor)} disabled />} label="Limpiar monitor" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.clean_mouse)} disabled />} label="Limpiar mouse (esfera y rodillo)" />
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" >
                    4. Verificación final de funcionamiento.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={Boolean(data.ignition_station)} disabled />} label="Encendido estación" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.operating_system_boot)} disabled />} label="Arranque del SO" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.end_HDD)} disabled />} label="Disco duro" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.end_CD_rom_DVD)} disabled />} label="CD Rom y/o DVD" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.end_display)} disabled />} label="Monitor" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.end_mouse)} disabled />} label="Mouse" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.end_keyboard)} disabled />} label="Teclado" />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={8}>
                <TextField
                    value={data.end_error_description}
                    disabled
                    fullWidth
                    label="Descripción de error encontrado o reportado"
                    variant="outlined"
                    multiline
                    rows={11}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" >
                    5. mantenimiento de software.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={Boolean(data.check_anti_virus)} disabled />} label="Verificación antivirus" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.deletion_temporary_cookies)} disabled />} label="Eliminación de temporales y cookies" />
                    <FormControlLabel control={<Checkbox checked={Boolean(data.disk_defragmentation)} disabled />} label="Desfragmentar disco duro" />
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" >
                    6. Actividades finales.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={Boolean(data.equipment_delivery)} disabled />} label="Entrega del equipo al usuario" />
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
                    <RadioGroup value={data.Q1} row>
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
                    <RadioGroup value={data.Q2} row>
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
                    <RadioGroup value={data.Q3} row>
                        <FormControlLabel value="buena" control={<Radio disabled />} label="Buena" />
                        <FormControlLabel value="regular" control={<Radio disabled />} label="Regular" />
                        <FormControlLabel value="malo" control={<Radio disabled />} label="Malo" />
                    </RadioGroup>
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    disabled
                    value={data.observations}
                    label="Observaciones"
                    variant="outlined"
                    multiline
                    rows={4}
                />
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
    )
}