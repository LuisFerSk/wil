import { useContext, useId } from "react";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Autocomplete, Form, Select } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { addIfNotExist, addInArray } from "utils";
import { BrandStateInterface, RegisterInterface } from "interfaces";
import { authContext } from "provider/Auth";
import { initialValues, schema, typesPrinterScanner } from "../schema";
import { areas, flat, headquarters } from "constants";
import { printerScannerCreate } from "services/printer_scanner";

interface PrinterScannerRegisterProps<T> extends RegisterInterface<T[] | []>, BrandStateInterface { }

export default function PrinterScannerRegister<T>(props: PrinterScannerRegisterProps<T>) {
    const { setData, brands, setBrands } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const uuidTypeEquipment = useId();
    const uuidCampus = useId();
    const uuidArea = useId();

    const [message, setMessage, messageLoader] = useMessage()

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: (data, { resetForm }) => {
            messageLoader()

            const newData = {
                ...data,
                cc: data.cc.toString(),
                phone: data.phone?.toString() || null,
                license_plate: data.license_plate?.toString() || null,
            }

            printerScannerCreate(token, newData)
                .then((response) => {
                    setData((old) => addInArray<T>(old, response.data.info))
                    setBrands((old) => addIfNotExist(old, response.data.info.brand))
                    resetForm()
                    setMessage("success", 'Se ha guardado correctamente la impresora o scanner.')
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
                            label: 'Marca',
                            variant: "outlined",
                            ...getFieldFormikProps('brand')
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        {...getFieldFormikProps('license_plate')}
                        type='number'
                        fullWidth
                        label="Placa"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('model')} fullWidth label="Modelo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('serial')} fullWidth label="Serial" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={2}>
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