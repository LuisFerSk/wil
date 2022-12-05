import { Button, Grid } from "@mui/material";
import { Form, TextFieldPassword } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { authContext } from "provider/Auth";
import { useContext } from "react";
import { changePasswordInitialValues, changePasswordSchema } from "./schema";

export default function ChangeMePassword(): JSX.Element {
    const [mensaje, setMensaje, mensajeLoader] = useMessage()

    const authsContext = useContext(authContext)
    const { token } = authsContext;

    const formik = useFormik({
        initialValues: changePasswordInitialValues,
        validationSchema: changePasswordSchema,
        onSubmit: (data, { resetForm }) => {
            mensajeLoader()

            const propsChangePassword = {
                token,
                password: data.password,
            }
        },
    })

    const [getFieldFormikProps] = useFormikFiledProps(formik)

    return (
        <Form formik={formik}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextFieldPassword
                        {...getFieldFormikProps('password')}
                        label="Contraseña"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextFieldPassword
                        {...getFieldFormikProps('confirmarPassword')}
                        label="Confirmar contraseña"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Guardar</Button>
                </Grid>
                <Grid item xs={12}>
                    {mensaje}
                </Grid>
            </Grid>
        </Form >
    )
}