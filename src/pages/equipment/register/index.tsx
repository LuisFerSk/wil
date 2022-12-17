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

function RegisterEquipment<T>(props: RegisterInterface<T[] | []>): JSX.Element {
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
                    <TextField {...getFieldFormikProps('referencia')} fullWidth label="Referencia" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField {...getFieldFormikProps('idEquipo')} fullWidth label="ID de equipo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('numeroSerialCPU')} fullWidth label="Número serial del equipo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('numeroSerialMonitor')} fullWidth label="Número serial del monitor" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('numeroSerialTeclado')} fullWidth label="Número serial del teclado" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('numeroSerialMouse')} fullWidth label="Número serial del mouse" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField {...getFieldFormikProps('direccionIP')} fullWidth label="Dirección IP" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField {...getFieldFormikProps('sistemaOperativo')} fullWidth label="Sistema operativo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('tipoProcesador')} fullWidth label="Tipo Procesador" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('discoDuro')} fullWidth label="Disco Duro" variant="outlined" />
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

export default RegisterEquipment;