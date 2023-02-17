import { useContext, useId } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, Radio, RadioGroup, TextField, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import ReactSignatureCanvas from "react-signature-canvas";

import { AsyncSelect, Form } from "components";
import { useFormikFiledProps, useMessage } from "hooks";
import { addInArray, dataURLtoBlob, formatDateApi } from "utils";
import { MaintenanceInterface } from "interfaces";
import { authContext } from "provider/Auth";
import { maintenanceCreate } from "services/maintenance";
import styles from './style.module.css'
import { maintenanceInitialValues, maintenanceSchema } from "pages/maintenance/schema";
import { ConstantsInterface } from "pages/maintenance/Maintenance";

interface Props extends ConstantsInterface {
    setData: React.Dispatch<React.SetStateAction<MaintenanceInterface[]>>
}

let sigPad: ReactSignatureCanvas | null = null;

function clear() {
    sigPad?.clear()
}

export default function RegisterMaintenance(props: Props) {
    const { setData, equipments } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const uuidEquipment = useId()

    const theme = useTheme()

    const [message, setMessage, messageLoader, resetMensaje] = useMessage()

    const formik = useFormik({
        initialValues: maintenanceInitialValues,
        validationSchema: maintenanceSchema,
        onSubmit: (data, { resetForm }) => {
            messageLoader()

            if (!sigPad) {
                return;
            }

            const { date } = data;

            const signature = dataURLtoBlob(sigPad.getTrimmedCanvas().toDataURL('image/png'))

            const dataToCreate = {
                ...data,
                signature,
                date: formatDateApi(date)
            }

            maintenanceCreate(token, dataToCreate)
                .then((response) => {
                    clear()
                    setData((old) => addInArray(old, response.data.info))
                    resetForm()
                    setMessage("success", 'Se ha guardado correctamente el mantenimiento.')
                })
                .catch((error) => {
                    const { response } = error;
                    if (response) {
                        setMessage('error', response.data)
                        return;
                    }
                    setMessage('error', "Ha sucedió un error al realizar la operación")
                    console.log(error)
                })
        },
    })

    const [getFieldFormikProps] = useFormikFiledProps(formik)

    return (
        <Form formik={formik}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" >
                        1. Actividades iniciales.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <AsyncSelect
                        data={equipments}
                        textLoading='Cargando equipos...'
                        textNotData='Se debe registrar al menos un equipo para poder realizar un mantenimiento'
                        fieldProps={{
                            ...getFieldFormikProps('equipment_id'),
                            fullWidth: true,
                            variant: 'outlined',
                            label: 'Equipo',
                        }}
                    >
                        {equipments?.map((equipment, key) =>
                            <MenuItem key={`${uuidEquipment}-${key}`} value={equipment.id}>
                                {`${equipment.type} - ${equipment.brand.name} ${equipment.model} - serial: ${equipment.serial}`}
                            </MenuItem>
                        )}
                    </AsyncSelect>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        {...getFieldFormikProps('city')}
                        fullWidth
                        label="Ciudad"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        {...getFieldFormikProps('workstation')}
                        fullWidth
                        label="Estación de trabajo"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        {...getFieldFormikProps('date')}
                        fullWidth
                        type='date'
                        label="Fecha"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" >
                        2. Verificación de funcionamiento.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('ignition_station')} />} label="Encendido estación" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('operating_system_boot')} />} label="Arranque del SO" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('HDD')} />} label="Disco duro" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('CD_rom_DVD')} />} label="CD Rom y/o DVD" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('display')} />} label="Monitor" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('mouse')} />} label="Mouse" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('keyboard')} />} label="Teclado" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        {...getFieldFormikProps('error_description')}
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
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('remove_indoor_dust')} />} label="Remover polvo interno sin desconectar tarjetas" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('check_internal_connections')} />} label="Verificar conexiones internas" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('connect_power_peripheral_cables')} />} label="Conectar cables de potencia y periféricos" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('close_PC_clean_case')} />} label="Cerrar CPU y limpiar carcaza" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('clean_keyboard')} />} label="Limpiar teclado" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('clean_monitor')} />} label="Limpiar monitor" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('clean_mouse')} />} label="Limpiar mouse (esfera y rodillo)" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" >
                        4. Verificación final de funcionamiento.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('end_ignition_station')} />} label="Encendido estación" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('end_operating_system_boot')} />} label="Arranque del SO" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('end_HDD')} />} label="Disco duro" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('end_CD_rom_DVD')} />} label="CD Rom y/o DVD" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('end_display')} />} label="Monitor" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('end_mouse')} />} label="Mouse" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('end_keyboard')} />} label="Teclado" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        {...getFieldFormikProps('end_error_description')}
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
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('check_anti_virus')} />} label="Verificación antivirus" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('deletion_temporary_cookies')} />} label="Eliminación de temporales y cookies" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('disk_defragmentation')} />} label="Desfragmentar disco duro" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" >
                        6. Actividades finales.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('equipment_delivery')} />} label="Entrega del equipo al usuario" />
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
                        <RadioGroup {...getFieldFormikProps('Q1')} row>
                            <FormControlLabel value="buena" control={<Radio />} label="Buena" />
                            <FormControlLabel value="regular" control={<Radio />} label="Regular" />
                            <FormControlLabel value="malo" control={<Radio />} label="Malo" />
                        </RadioGroup>
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        7.2. ¿Como califica la atención brindada por el soporte?
                    </Typography>
                    <FormGroup>
                        <RadioGroup {...getFieldFormikProps('Q2')} row>
                            <FormControlLabel value="buena" control={<Radio />} label="Buena" />
                            <FormControlLabel value="regular" control={<Radio />} label="Regular" />
                            <FormControlLabel value="malo" control={<Radio />} label="Malo" />
                        </RadioGroup>
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        7.3. ¿Cual es su percepción sobre la capacitación del personal que realizo las actividades de mantenimiento?
                    </Typography>
                    <FormGroup>
                        <RadioGroup {...getFieldFormikProps('Q3')} row>
                            <FormControlLabel value="buena" control={<Radio />} label="Buena" />
                            <FormControlLabel value="regular" control={<Radio />} label="Regular" />
                            <FormControlLabel value="malo" control={<Radio />} label="Malo" />
                        </RadioGroup>
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...getFieldFormikProps('observations')}
                        fullWidth
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
                        <ReactSignatureCanvas
                            canvasProps={{ className: styles.sigPad }}
                            ref={(ref) => { sigPad = ref }}
                        />
                    </Box>
                    <Typography>
                        Firma del usuario
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button type="submit" variant="contained">Guardar</Button>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                    <Button variant='outlined' onClick={() => clear()}>Limpiar firma</Button>
                </Grid>
                <Grid item xs={12} textAlign='center'>
                    {message}
                </Grid>
            </Grid>
        </Form >
    )
}