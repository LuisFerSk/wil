import { Button, Grid, TextField } from "@mui/material";
import { Form } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { equipmentSchema } from "../schema";
import { updateDataInArray } from "utils";
import { EquipmentInterface, UpdateInterface } from "interfaces";
import { useContext } from "react";
import { authContext } from "provider/Auth";
import { equipmentUpdate } from "api/equipment";

export default function EquipmentUpdate(props: UpdateInterface<EquipmentInterface>): JSX.Element {
    const { initData, setData } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader, resetMessage] = useMessage()


    const formik = useFormik({
        initialValues: initData,
        validationSchema: equipmentSchema,
        onSubmit: (data) => {
            messageLoader()

            const { id } = data;

            equipmentUpdate(token, data)
                .then((response) => {
                    setData((old) => updateDataInArray<EquipmentInterface>(old, id, data))
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
                    <TextField {...getFieldFormikProps('brand')} fullWidth label="Marca" variant="outlined" />
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