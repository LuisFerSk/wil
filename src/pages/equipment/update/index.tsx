import { Button, Grid, TextField } from "@mui/material";
import { Autocomplete, Form } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { equipmentSchema } from "../schema";
import { addIfNotExist, updateDataInArray } from "utils";
import { BrandStateInterface, EquipmentInterface, UpdateInterface } from "interfaces";
import { useContext } from "react";
import { authContext } from "provider/Auth";
import { equipmentUpdate } from "services/equipment";

interface EquipmentUpdateProps extends UpdateInterface<EquipmentInterface>, BrandStateInterface { }

export default function EquipmentUpdate(props: EquipmentUpdateProps): JSX.Element {
    const { initData, setData, brands, setBrands } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader, resetMessage] = useMessage()


    const formik = useFormik({
        initialValues: { ...initData, brand: initData.brand.name },
        validationSchema: equipmentSchema,
        onSubmit: (data) => {
            messageLoader()

            const { id } = data;

            equipmentUpdate(token, data)
                .then((response) => {
                    setData((old) => updateDataInArray<EquipmentInterface>(old, id, response.data.info))
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
                    <TextField {...getFieldFormikProps('type')} fullWidth label="Tipo de equipo" variant="outlined" />
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
                    <TextField {...getFieldFormikProps('monitor_serial')} fullWidth label="Serial del monitor" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('license_plate')} fullWidth label="Placa" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('area')} fullWidth label="Area" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('flat')} fullWidth label="Piso" type="number" variant="outlined" />
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