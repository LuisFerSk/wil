import { useContext } from "react";
import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";

import { changeMePassword, changePassword } from "services/support";
import { Form, TextFieldPassword } from "components";
import { useFormikFiledProps, useMessage } from "hooks";
import { AuthContext } from "provider/Auth";
import { changePasswordInitialValues, changePasswordSchema } from "./schema";
import { ChangePasswordRequest } from "services/models";

interface Props {
    id?: number
}

export default function ChangePassword(props: Props) {
    const { id } = props;

    const [message, setMessage, messageLoader] = useMessage()

    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const formik = useFormik({
        initialValues: changePasswordInitialValues,
        validationSchema: changePasswordSchema,
        onSubmit: (data) => {
            messageLoader()

            if (!id) {
                changeMePassword(token, data.password)
                    .then((_) => {
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
                return;
            }

            const propsChangePassword = {
                id,
                password: data.password,
            }

            changePassword(token, new ChangePasswordRequest(propsChangePassword))
                .then((_) => {
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