import { useContext } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Form, TextFieldPassword } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { addInArray } from "utils";
import { RegisterInterface } from "interfaces";
import { authContext } from "provider/Auth";
import { supportInitialValues, supportSchema } from "../schema";
import { supportCreate } from "api/support";

export default function SupportRegister<T>(props: RegisterInterface<T[] | []>): JSX.Element {
    const { setData } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const formik = useFormik({
        initialValues: supportInitialValues,
        validationSchema: supportSchema,
        onSubmit: (data, { resetForm }) => {
            messageLoader()

            if (!token) {
                return;
            }

            supportCreate(token, data)
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        setData((old) => addInArray<T>(old, response.data.info))
                        resetForm()
                        setMessage("success", 'Se ha guardado correctamente el usuario.')
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
                <Grid item xs={12} sm={6}>
                    <TextField {...getFieldFormikProps('username')} fullWidth label="Nombre de usuario" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldPassword {...getFieldFormikProps('password')} fullWidth type="password" label="Cédula" variant="outlined" />
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