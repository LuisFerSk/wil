import { Button, Grid, TextField, Typography } from "@mui/material";
import Form from "components/form";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { equipmentSchema } from "../schema";
import { updateDataInArray } from "utils";
import { EquipmentInterface, UpdateInterface } from "interfaces";
import { useContext } from "react";
import { authContext } from "provider/Auth";
import { filter } from "lodash";

export default function EquipmentUpdate(props: UpdateInterface<EquipmentInterface>): JSX.Element {
    const { initData, setData } = props;

    const authsContext = useContext(authContext)
    const { token } = authsContext;

    const [mensaje, setMensaje, mensajeLoader, resetMensaje] = useMessage()


    const formik = useFormik({
        initialValues: initData,
        validationSchema: equipmentSchema,
        onSubmit: (data) => {
            mensajeLoader()

            // const { id, id_sectorial, id_subsector, capacidad, memoria, espacioUsado } = data;

            // const dataNormalizado = {
            //     ...data,
            //     capacidad: `${capacidad}${_unidades.capacidadDisco}`,
            //     memoria: `${memoria}${_unidades.memoriaRAM}`,
            //     espacioUsado: `${espacioUsado}${_unidades.espacionUsado}`,
            // }

            // equipoUpdate(dataNormalizado, token)
            //     .then((response) => {
            //         if (response.status === 200) {
            //             setData((old) => updateDataInArray<EquipmentInterface>(old, id, response.data.data))
            //             setMensaje("success", 'Se ha actualizado correctamente el equipo.')
            //         }
            //     })
            //     .catch(({ response }) => {
            //         setMensaje('error', response.data.message)
            //     })
        },
    })

    const { values, setFieldValue } = formik;

    const [getFieldFormikProps] = useFormikFiledProps(formik)

    return (
        <Form formik={formik}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('tipo')} fullWidth label="Tipo de equipo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('referencia')} fullWidth label="Referencia" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('idEquipo')} fullWidth label="ID de equipo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('numeroSerialCPU')} fullWidth label="Número serial del equipo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('numeroSerialMonitor')} fullWidth label="Número serial del monitor" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('numeroSerialTeclado')} fullWidth label="Número serial del teclado" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('numeroSerialMouse')} fullWidth label="Número serial del mouse" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('direccionIP')} fullWidth label="Dirección IP" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('sistemaOperativo')} fullWidth label="Sistema operativo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('tipoProcesador')} fullWidth label="Tipo Procesador" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('discoDuro')} fullWidth label="Disco Duro" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom color='primary'>
                        Procure que los software instalados estén separados por comas.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...getFieldFormikProps('softwareInstalado')}
                        multiline
                        rows={4}
                        fullWidth
                        label="Software Instalado"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button type="submit" variant="contained">Guardar</Button>
                </Grid>
                <Grid item xs={12} textAlign='center'>
                    {mensaje}
                </Grid>
            </Grid>
        </Form >
    )
}