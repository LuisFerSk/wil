import { useContext, useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Autocomplete as AutocompleteMaterial, FormGroup, Grid, Radio, RadioGroup, Typography, useTheme, TextField } from "@mui/material";
import { useFormik } from "formik";
import ReactSignatureCanvas from "react-signature-canvas";

import { Form } from "components";
import { useFormikFiledProps, useMessage } from "hooks";
import { dataURLtoBlob } from "utils";
import { AuthContext } from "provider/Auth";
import { maintenanceCreate } from "services/maintenance";
import styles from './style.module.css'
import { maintenanceSchema } from "schemas/maintenance";
import { MaintenanceCreateRequest } from "services/models";
import { MaintenanceContext } from "pages/maintenance/context";
import { EquipmentFindAllBloc, EquipmentFindAllBlocFailure, EquipmentFindAllBlocLoading, EquipmentFindAllBlocSuccess } from "bloc";
import { equipmentFindAll } from "services/equipment";
import { QUESTIONS_OPTIONS, TYPE_EQUIPMENT } from "constants";
import { AutoCompleteProps } from "components/autocomplete/Autocomplete";

let sigPad: ReactSignatureCanvas | null = null;

function clear() {
    sigPad?.clear()
}

export default function RegisterMaintenance() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const maintenanceContext = useContext(MaintenanceContext)
    const { getMaintenances } = maintenanceContext;

    const theme = useTheme()

    const [message, setMessage, messageLoader] = useMessage()

    const formik = useFormik({
        initialValues: new MaintenanceCreateRequest(),
        validationSchema: maintenanceSchema,
        onSubmit: (data, { resetForm }) => {
            messageLoader()

            const signature = sigPad ? dataURLtoBlob(sigPad.getTrimmedCanvas().toDataURL('image/png')) : undefined

            const dataToCreate = { ...data, signature }

            maintenanceCreate(token, new MaintenanceCreateRequest(dataToCreate))
                .then((_) => {
                    getMaintenances && getMaintenances()

                    clear()
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
                    <SelectEquipment
                        setFieldValue={formik.setFieldValue}
                        textFieldProps={{
                            ...getFieldFormikProps('equipmentId'),
                            fullWidth: true,
                            variant: 'outlined',
                            label: 'Equipo',
                        }}
                    />
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
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('ignitionStation')} />} label="Encendido estación" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('operatingSystemBoot')} />} label="Arranque del SO" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('HDD')} />} label="Disco duro" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('cdRomDvd')} />} label="CD Rom y/o DVD" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('display')} />} label="Monitor" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('mouse')} />} label="Mouse" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('keyboard')} />} label="Teclado" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        {...getFieldFormikProps('errorDescription')}
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
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('removeIndoorDust')} />} label="Remover polvo interno sin desconectar tarjetas" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('checkInternalConnections')} />} label="Verificar conexiones internas" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('connectPowerPeripheralCables')} />} label="Conectar cables de potencia y periféricos" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('closePcCleanCase')} />} label="Cerrar CPU y limpiar carcaza" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('cleanKeyboard')} />} label="Limpiar teclado" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('cleanMonitor')} />} label="Limpiar monitor" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('cleanMouse')} />} label="Limpiar mouse (esfera y rodillo)" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" >
                        4. Verificación final de funcionamiento.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('endIgnitionStation')} />} label="Encendido estación" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('endOperatingSystemBoot')} />} label="Arranque del SO" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('endHdd')} />} label="Disco duro" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('endCdRomDvd')} />} label="CD Rom y/o DVD" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('endDisplay')} />} label="Monitor" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('endMouse')} />} label="Mouse" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('endKeyboard')} />} label="Teclado" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        {...getFieldFormikProps('endErrorDescription')}
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
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('checkAntiVirus')} />} label="Verificación antivirus" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('deletionTemporaryCookies')} />} label="Eliminación de temporales y cookies" />
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('diskDefragmentation')} />} label="Desfragmentar disco duro" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" >
                        6. Actividades finales.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox {...getFieldFormikProps('equipmentDelivery')} />} label="Entrega del equipo al usuario" />
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
                        <RadioGroup {...getFieldFormikProps('question_1')} row>
                            {QUESTIONS_OPTIONS.map((item) =>
                                <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
                            )}
                        </RadioGroup>
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        7.2. ¿Como califica la atención brindada por el soporte?
                    </Typography>
                    <FormGroup>
                        <RadioGroup {...getFieldFormikProps('question_2')} row>
                            {QUESTIONS_OPTIONS.map((item) =>
                                <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
                            )}
                        </RadioGroup>
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        7.3. ¿Cual es su percepción sobre la capacitación del personal que realizo las actividades de mantenimiento?
                    </Typography>
                    <FormGroup>
                        <RadioGroup {...getFieldFormikProps('question_3')} row>
                            {QUESTIONS_OPTIONS.map((item) =>
                                <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
                            )}
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

interface SelectEquipmentProps<T> extends Omit<AutoCompleteProps<T>, 'options' | 'fieldValue'> { }

function SelectEquipment<T>(props: SelectEquipmentProps<T>) {
    const { textFieldProps, setFieldValue } = props;

    const [bloc, setBloc] = useState<EquipmentFindAllBloc>(new EquipmentFindAllBlocLoading())

    const authContext = useContext(AuthContext)
    const { token } = authContext;

    useEffect(() => {
        equipmentFindAll(token)
            .then((response) => {
                setBloc(new EquipmentFindAllBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new EquipmentFindAllBlocFailure(error))

            })
    }, [])

    if (bloc instanceof EquipmentFindAllBlocSuccess) {
        return <_SelectEquipment
            textFieldProps={textFieldProps}
            bloc={bloc}
            setFieldValue={setFieldValue}
        />

    }

    if (bloc instanceof EquipmentFindAllBlocLoading) {
        return (
            <TextField
                {...textFieldProps}
                value="Cargando equipos..."
                disabled
            />
        )
    }

    return (
        <TextField
            {...props}
            disabled
            value=''
            helperText="Se debe registrar al menos un equipo para poder realizar un mantenimiento"
            error={true}
        />
    )

}

interface _SelectEquipmentProps<T> extends Omit<AutoCompleteProps<T>, 'options' | 'fieldValue'> {
    bloc: EquipmentFindAllBlocSuccess
}

function _SelectEquipment<T>(props: _SelectEquipmentProps<T>) {
    const { bloc, textFieldProps, setFieldValue } = props;

    const { name = '' } = textFieldProps;

    return (
        <AutocompleteMaterial
            handleHomeEndKeys
            options={bloc.state}
            onChange={(event, value) => {
                if (!value) {
                    setFieldValue(name, '')
                    return;
                }

                setFieldValue(name, value.id)
            }}
            getOptionLabel={(option) => option.serial}
            renderOption={(props, option) => {
                return (
                    <li {...props}>{option.serial} ({TYPE_EQUIPMENT[option.type as keyof typeof TYPE_EQUIPMENT]} {option.brand.name} {option.model})</li>
                )
            }}
            noOptionsText="No se encontró ningún equipo con ese serial"
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...textFieldProps}
                    label="Serial del equipo"
                />
            )}
        />
    )
}