import { Button, Grid } from "@mui/material";
import { changePassword } from "api/support";
import { Form, TextFieldPassword } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { IdType } from "interfaces";
import { authContext } from "provider/Auth";
import { useContext } from "react";
import { changePasswordInitialValues, changePasswordSchema } from "./schema";

interface ChangePassordProps {
    id: IdType
}

export default function ChangePassword(props: ChangePassordProps) {
    const { id } = props;

    const [message, setMessage, messageLoader, resetMessage] = useMessage()

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const formik = useFormik({
        initialValues: changePasswordInitialValues,
        validationSchema: changePasswordSchema,
        onSubmit: (data, { resetForm }) => {
            messageLoader()

            const propsChangePassword = {
                id,
                token,
                password: data.password,
            }

            changePassword(propsChangePassword)
                .then((response) => {
                    setMessage("success", 'Se ha cambiado la contraseña exitosamente.')
                })
                .catch(error => {
                    const { response } = error;
                    if (response) {
                        setMessage('error', response.data.message)
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
                    {message}
                </Grid>
            </Grid>
        </Form >
    )
}