import { useContext } from "react";
import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";

import { Form, TextFieldPassword } from "components";
import { useFormikFiledProps, useMessage } from "hooks";
import { AuthContext } from "provider/Auth";
import { supportCreate } from "services/support";
import { supportSchema } from "pages/support/schema";
import { SupportCreateRequest } from "services/models";
import { SupportContext } from "pages/support/context";

export default function SupportRegister() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const supportContext = useContext(SupportContext)
    const { getSupports } = supportContext;

    const [message, setMessage, messageLoader] = useMessage()

    const formik = useFormik({
        initialValues: new SupportCreateRequest(),
        validationSchema: supportSchema,
        onSubmit: (data, { resetForm }) => {
            messageLoader()

            supportCreate(token, new SupportCreateRequest(data))
                .then((_) => {
                    getSupports && getSupports()
                    resetForm()
                    setMessage("success", 'Se ha guardado correctamente el usuario.')
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
                    <TextField {...getFieldFormikProps('username')} fullWidth label="Nombre de usuario" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldPassword {...getFieldFormikProps('password')} fullWidth type="password" label="Contraseña" variant="outlined" />
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