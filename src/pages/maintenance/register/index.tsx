import { useContext, useId } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, TextField } from "@mui/material";
import { Form, Select } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { addInArray } from "utils";
import { RegisterInterface } from "interfaces";
import { authContext } from "provider/Auth";
import { maintenanceInitialValues, maintenanceSchema } from "../schema";
import { maintenanceCreate } from "api/maintenance";
import { ConstantsInterface } from "../"

interface UserRegisterProps<T> extends RegisterInterface<T[] | []>, ConstantsInterface { }

export default function MaintenanceRegister<T>(props: UserRegisterProps<T>): JSX.Element {
    const { setData, users } = props;

    const _authContext = useContext(authContext)
    const { token } = _authContext;

    const uuidUsuario = useId()

    const [message, setMessage, messageLoader, resetMensaje] = useMessage()

    const formik = useFormik({
        initialValues: maintenanceInitialValues,
        validationSchema: maintenanceSchema,
        onSubmit: (data, { resetForm }) => {
            messageLoader()

            if (!token) {
                resetMensaje()
                return;
            }

            maintenanceCreate(token, data)
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        setData((old) => addInArray<T>(old, response.data.info))
                        resetForm()
                        setMessage("success", 'Se ha guardado correctamente el mantenimiento.')
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
                <Grid item xs={12}>
                    <Select
                        {...getFieldFormikProps('equipment_user_id')}
                        fullWidth
                        label="Usuario"
                        variant="outlined"
                    >
                        {users.map((user, key) =>
                            <MenuItem key={`${uuidUsuario}-${key}`} value={user.id}>
                                {user.name}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        {...getFieldFormikProps('date')}
                        fullWidth
                        type='date'
                        label="Fecha"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={9}>
                    <TextField {...getFieldFormikProps('workstation')} fullWidth label="Estación de trabajo" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Encendido estación" />
                        <FormControlLabel control={<Checkbox />} label="Arranque del SO" />
                        <FormControlLabel control={<Checkbox />} label="Disco duro" />
                        <FormControlLabel control={<Checkbox />} label="CD Rom y/o DVD" />
                        <FormControlLabel control={<Checkbox />} label="Monitor" />
                        <FormControlLabel control={<Checkbox />} label="Mouse" />
                        <FormControlLabel control={<Checkbox />} label="Teclado" />
                    </FormGroup>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        {...getFieldFormikProps('error_description')}
                        fullWidth
                        label="Descripción de error encontrado o reportado"
                        variant="outlined"
                        multiline
                        rows={4}
                    />

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