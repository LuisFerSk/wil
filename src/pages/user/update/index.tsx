import { Button, Grid, TextField } from "@mui/material";
import { Form } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { userSchema } from "../schema";
import { updateDataInArray } from "utils";
import { UpdateInterface, UserInterface } from "interfaces";
import { useContext } from "react";
import { authContext } from "provider/Auth";
import { userUpdate } from "api/user";

export default function UserUpdate(props: UpdateInterface<UserInterface>): JSX.Element {
    const { initData, setData } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const [message, setMessage, messageLoader, resetMessage] = useMessage()


    const formik = useFormik({
        initialValues: initData,
        validationSchema: userSchema,
        onSubmit: (data) => {
            messageLoader()

            const { id } = data;

            if (!token) {
                return;
            }

            userUpdate(token, data)
                .then((response) => {
                    if (response.status === 200) {
                        setData((old) => updateDataInArray<UserInterface>(old, id, data))
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
                    <TextField {...getFieldFormikProps('name')} fullWidth label="Tipo de equipo" variant="outlined" />
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