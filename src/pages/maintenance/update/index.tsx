import { Button, Grid, TextField } from "@mui/material";
import { Form } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { maintenanceSchema } from "../schema";
import { updateDataInArray } from "utils";
import { UpdateInterface, MaintenanceInterface } from "interfaces";
import { useContext } from "react";
import { authContext } from "provider/Auth";
import { maintenanceUpdate } from "api/maintenance";

export default function MaintenanceUpdate(props: UpdateInterface<MaintenanceInterface>): JSX.Element {
    const { initData, setData } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader, resetMessage] = useMessage()


    const formik = useFormik({
        initialValues: initData,
        validationSchema: maintenanceSchema,
        onSubmit: (data) => {
            messageLoader()

            if (!token) {
                resetMessage()
                return;
            }

            const { id } = data;

            maintenanceUpdate(token, data)
                .then((response) => {
                    if (response.status === 200) {
                        setData((old) => updateDataInArray<MaintenanceInterface>(old, id, response.data.info))
                        setMessage("success", 'Se ha actualizado correctamente el usuario.')
                    }
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
                <Grid item xs={12}>
                    <TextField {...getFieldFormikProps('nme')} fullWidth label="Tipo de equipo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('cc')} fullWidth type="number" label="Marca" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('phone')} fullWidth type="number" label="Modelo" variant="outlined" />
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