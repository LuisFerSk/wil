import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useId } from "react";

import { Autocomplete, Form, Select } from "components";
import { useFormikFiledProps, useMessage } from "hooks";
import { addIfNotExist, updateDataInArray } from "utils";
import { BrandStateInterface, PrinterScannerInterface, UpdateInterface, flat } from "interfaces";
import { authContext } from "provider/Auth";
import { printerScannerUpdate } from "services/printer_scanner";
import { areas, headquarters } from "constants";
import { schema, typesPrinterScanner } from "pages/printerScanner/schema";

interface Props extends UpdateInterface<PrinterScannerInterface>, BrandStateInterface { }

export default function UpdatePrinterScanner(props: Props) {
    const { initData, setData, brands, setBrands } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const uuidTypeEquipment = useId();
    const uuidCampus = useId();
    const uuidArea = useId();

    const formik = useFormik({
        initialValues: { ...initData, brand: initData.brand.name },
        validationSchema: schema,
        onSubmit: (data) => {
            messageLoader()

            const { id } = data;

            const newData = {
                ...data,
                cc: data.cc.toString(),
                phone: data.phone?.toString() || null,
                license_plate: data.license_plate?.toString() || null,
            }

            printerScannerUpdate(token, newData)
                .then((response) => {
                    setData((old) => updateDataInArray(old, id, response.data.info))
                    setBrands((old) => addIfNotExist(old, response.data.info.brand))
                    setMessage("success", 'Se ha actualizado correctamente el equipo.')
                })
                .catch(({ response }) => {
                    setMessage('error', response.data.message)
                })
        },
    })

    const [getFieldFormikProps] = useFormikFiledProps(formik)

    return (
        <Form formik={formik}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Select
                        fullWidth
                        label="Tipo"
                        variant="outlined"
                        {...getFieldFormikProps('type')}
                    >
                        {typesPrinterScanner.map((printerScanner, key) =>
                            <MenuItem key={`${uuidTypeEquipment}-${key}`} value={printerScanner.value}>
                                {printerScanner.label}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('model')} fullWidth label="Modelo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('serial')} fullWidth label="Serial" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('license_plate')} type='number' fullWidth label="Placa" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                <Grid item xs={4}>
                    <TextField
                        value={flat[formik.values.area] || ''}
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
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('cc')} fullWidth type="number" label="Cédula" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('phone')} fullWidth type="number" label="Teléfono" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <Button type="submit" variant="contained">Guardar</Button>
                </Grid>
                <Grid item xs={12} textAlign='center'>
                    {message}
                </Grid>
            </Grid>
        </Form >
    )
}