import { Button, Grid, TextField } from "@mui/material";
import Form from "components/form";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { userInitialValues, userSchema } from "./schema";
import { usuarioInsert } from "api/usuario";
import { addInArray } from "utils";
import { RegisterInterface } from "interfaces";
import { authContext } from "provider/Auth";
import { useContext } from "react";
import { TextFieldPassword } from "components";

function RegisterUser<T>(props: RegisterInterface<T[] | []>): JSX.Element {
    const { setData } = props;

    const [mensaje, setMensaje, mensajeLoader] = useMessage()

    const authsContext = useContext(authContext)
    const { token } = authsContext;

    const formik = useFormik({
        initialValues: userInitialValues,
        validationSchema: userSchema,
        onSubmit: (data, { resetForm }) => {
            mensajeLoader()

            usuarioInsert(data, token)
                .then((response: any) => {
                    if (response.status === 200) {
                        setData((old) => addInArray<T>(old, response.data.data))
                        resetForm()
                        setMensaje("success", 'Se ha guardado correctamente el usuario.')
                    }
                })
                .catch((error) => {
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
                    <TextField {...getFieldFormikProps('username')} fullWidth label="Nombre de usuario" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextFieldPassword {...getFieldFormikProps('password')} label="Contraseña" variant="outlined" />
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

export default RegisterUser;