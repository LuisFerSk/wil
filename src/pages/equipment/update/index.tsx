import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Autocomplete, Form, Select } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { equipmentSchema, typesEquipments } from "../schema";
import { addIfNotExist, updateDataInArray } from "utils";
import { BrandStateInterface, EquipmentInterface, flat, UpdateInterface } from "interfaces";
import { useContext, useId } from "react";
import { authContext } from "provider/Auth";
import { equipmentUpdate } from "services/equipment";
import { areas, headquarters } from "constants";

interface Props extends UpdateInterface<EquipmentInterface>, BrandStateInterface { }

export default function EquipmentUpdate(props: Props) {
    const { initData, setData, brands, setBrands } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const uuidTypeEquipment = useId()
    const uuidCampus = useId()
    const uuidArea = useId()

    const [message, setMessage, messageLoader, resetMessage] = useMessage()


    const formik = useFormik({
        initialValues: { ...initData, brand: initData.brand.name },
        validationSchema: equipmentSchema,
        onSubmit: (data) => {
            messageLoader()

            const { id } = data;

            const newData = {
                ...data,
                cc: data.cc.toString(),
                phone: data.phone?.toString() || null,
                license_plate: data.license_plate?.toString() || null,
                monitor_serial: data.monitor_serial || null
            }

            equipmentUpdate(token, newData)
                .then((response) => {
                    setData((old) => updateDataInArray<EquipmentInterface>(old, id, response.data.info))
                    setBrands((old) => addIfNotExist(old, response.data.info.brand))
                    setMessage("success", 'Se ha actualizado correctamente el equipo.')
                })
                .catch(({ response }) => {
                    setMessage('error', response.data)
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
                            label: 'marca',
                            variant: "outlined",
                            ...getFieldFormikProps('brand')
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...getFieldFormikProps('model')} fullWidth label="Modelo" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...getFieldFormikProps('serial')} fullWidth label="Serial" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...getFieldFormikProps('monitor_serial')} fullWidth label="Serial del monitor" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField {...getFieldFormikProps('license_plate')} type='number' fullWidth label="Placa" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={6}>
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
                        value={flat[formik.values.area as any] || ''}
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
                <Grid item xs={12} sm={6}>
                    <Button type="submit" variant="contained">Guardar</Button>
                </Grid>
                <Grid item xs={12} textAlign='center'>
                    {message}
                </Grid>
            </Grid>
        </Form >
    )
}