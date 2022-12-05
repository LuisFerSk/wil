import { Button, Grid } from "@mui/material";
import { changePassword } from "api/usuario";
import { Form, TextFieldPassword } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { authContext } from "provider/Auth";
import { useContext } from "react";
import { changePasswordInitialValues, changePasswordSchema } from "./schema";

interface ChangePassordProps {
    id: string
}

function ChangePassword(props: ChangePassordProps) {
    const { id } = props;

    const [mensaje, setMensaje, mensajeLoader] = useMessage()

    const authsContext = useContext(authContext)
    const { token } = authsContext;

    const formik = useFormik({
        initialValues: changePasswordInitialValues,
        validationSchema: changePasswordSchema,
        onSubmit: (data, { resetForm }) => {
            mensajeLoader()

            const propsChangePassword = {
                id,
                token,
                password: data.password,
            }

            changePassword(propsChangePassword)
                .then((response) => {
                    if (response.status === 200) {
                        setMensaje("success", 'Se ha cambiado la contraseña exitosamente.')
                    }
                })
                .catch(error => {
                    const { response } = error;
                    if (response) {
                        setMensaje('error', response.data.message)
                        return;
                    }
                    setMensaje('error', "Ha sucedió un error al realizar la operación")
                    console.log(error)
                })
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

export default ChangePassword;