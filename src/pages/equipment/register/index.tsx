import { useContext, useId } from "react";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Autocomplete, Form, Select } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { equipmentCreate } from "services/equipment";
import { addIfNotExist, addInArray } from "utils";
import { BrandStateInterface, EquipmentInterface, EquipmentProps, flat } from "interfaces";
import { authContext } from "provider/Auth";
import { equipmentInitialValues, equipmentSchema, typesEquipments } from "../schema";
import { areas, headquarters, noMonitor } from "constants";


interface Props extends BrandStateInterface {
    setData: React.Dispatch<React.SetStateAction<EquipmentInterface[]>>
}

export default function EquipmentRegister(props: Props) {
    const { setData, brands, setBrands } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const uuidTypeEquipment = useId();
    const uuidCampus = useId();
    const uuidArea = useId();

    const [message, setMessage, messageLoader] = useMessage()

    const formik = useFormik({
        initialValues: equipmentInitialValues,
        validationSchema: equipmentSchema,
        onSubmit: (data, { resetForm }) => {
            messageLoader()

            const newData = {
                ...data,
                cc: data.cc.toString(),
                phone: data.phone?.toString() || null,
                license_plate: data.license_plate?.toString() || null,
                monitor_serial: data.monitor_serial || null,
                monitor_license_plate: data.monitor_license_plate?.toString() || null,
            }

            equipmentCreate(token, newData as EquipmentProps)
                .then((response) => {
                    setData((old) => addInArray(old, response.data.info))
                    setBrands((old) => addIfNotExist(old, response.data.info.brand))
                    resetForm()
                    setMessage("success", 'Se ha guardado correctamente el equipo.')
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
                <Grid item xs={12} sm={6}>
                    <Select
                        fullWidth
                        label="Tipo"
                        variant="outlined"
                        {...getFieldFormikProps('type')}
                    >
                        {typesEquipments.map((typeEquipment, key) =>
                            <MenuItem key={`${uuidTypeEquipment}-${key}`} value={typeEquipment.value}>
                                {typeEquipment.label}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        fieldValue={formik.values.brand}
                        setFieldValue={formik.setFieldValue}
                        options={brands.map(brand => brand.name)}
                        textFieldProps={{
                            fullWidth: true,
                            label: 'Marca',
                            variant: "outlined",
                            ...getFieldFormikProps('brand')
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        {...getFieldFormikProps('license_plate')}
                        type='number'
                        fullWidth
                        label="Placa"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...getFieldFormikProps('model')} fullWidth label="Modelo" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...getFieldFormikProps('serial')} fullWidth label="Serial" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        {...getFieldFormikProps('monitor_license_plate')}
                        type='number'
                        fullWidth
                        label="Placa del monitor"
                        variant="outlined"
                        disabled={noMonitor[formik.values.type as keyof typeof noMonitor]}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        {...getFieldFormikProps('monitor_serial')}
                        fullWidth
                        label="Serial del monitor"
                        variant="outlined"
                        disabled={noMonitor[formik.values.type as keyof typeof noMonitor]}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        fullWidth
                        label="Sede"
                        variant="outlined"
                        {...getFieldFormikProps('campus')}
                    >
                        {headquarters.map((campus, key) =>
                            <MenuItem key={`${uuidCampus}-${key}`} value={campus.value}>
                                {campus.label}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Select
                        fullWidth
                        label="Area"
                        variant="outlined"
                        {...getFieldFormikProps('area')}
                    >
                        {areas.map((area, key) =>
                            <MenuItem key={`${uuidArea}-${key}`} value={area.value}>
                                {area.label}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        value={flat[formik.values.area as keyof typeof flat] || ''}
                        fullWidth
                        label="Piso"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: Boolean(formik.values.area),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" >
                        Información del usuario
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField {...getFieldFormikProps('user')} fullWidth label="Nombre" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...getFieldFormikProps('cc')} fullWidth type="number" label="Cédula" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...getFieldFormikProps('phone')} fullWidth type="number" label="Teléfono" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Guardar</Button>
                </Grid>
                <Grid item xs={12} textAlign='center'>
                    {message}
                </Grid>
            </Grid>
        </Form >
    )
}