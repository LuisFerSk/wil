import { useContext } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Form } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { equipmentCreate } from "api/equipment";
import { addInArray } from "utils";
import { RegisterInterface } from "interfaces";
import { authContext } from "provider/Auth";
import { equipmentInitialValues, equipmentSchema } from "../schema";

export default function RegisterEquipment<T>(props: RegisterInterface<T[] | []>): JSX.Element {
    const { setData } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const formik = useFormik({
        initialValues: equipmentInitialValues,
        validationSchema: equipmentSchema,
        onSubmit: (data, { resetForm }) => {
            messageLoader()

            if (!token) {
                return;
            }

            equipmentCreate(token, data)
                .then((response) => {
                    if (response.status === 200) {
                        setData((old) => addInArray<T>(old, response.data.info))
                        resetForm()
                        setMessage("success", 'Se ha guardado correctamente el equipo.')
                    }
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
                    <TextField {...getFieldFormikProps('flat')} fullWidth label="Piso" variant="outlined" />
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