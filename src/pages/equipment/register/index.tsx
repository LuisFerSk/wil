import { useContext, useEffect, useId, useState } from "react";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Form from "components/form";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { equipmentInitialValues, equipmentSchema } from "./schema";
import { equipoInsert } from "api/equipo";
import { addInArray } from "utils";
import { RegisterInterface, SubsectorInterface } from "interfaces";
import { Select } from "components";
import { filter } from "lodash";
import { authContext } from "provider/Auth";
import { unidades } from "constants/unidades";

function RegisterEquipment<T>(props: RegisterInterface<T[] | []>): JSX.Element {
    const { setData } = props;

    const authsContext = useContext(authContext)
    const { token, sectoriales, subsectores } = authsContext;

    const idSectoriales = useId();
    const idSubsectores = useId();
    const idUnidades = useId()

    const [mensaje, setMensaje, mensajeLoader] = useMessage()

    const [subsectoresFiltrados, setSubsectoresFiltrados] = useState<SubsectorInterface[] | []>([])

    const [_unidades, setUnidades] = useState({
        memoriaRAM: 'GB',
        capacidadDisco: 'GB',
        espacionUsado: 'GB',
    })

    function handlerChangeUnidades(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUnidades({
            ..._unidades,
            [event.target.name]: event.target.value
        })
    }

    const formik = useFormik({
        initialValues: equipmentInitialValues,
        validationSchema: equipmentSchema,
        onSubmit: (data, { resetForm }) => {
            mensajeLoader()

            const { sectorial, subsector, capacidad, memoria, espacioUsado } = data;

            const dataToInsert = {
                ...data,
                capacidad: `${capacidad}${_unidades.capacidadDisco}`,
                memoria: `${memoria}${_unidades.memoriaRAM}`,
                espacioUsado: `${espacioUsado}${_unidades.espacionUsado}`,
                sectorial: sectorial,
                subsector: subsector
            }

            equipoInsert(dataToInsert, token)
                .then((response) => {
                    if (response.status === 200) {
                        setData((old) => addInArray<T>(old, response.data.data))
                        resetForm()
                        setMensaje("success", 'Se ha guardado correctamente el equipo.')
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

    const { values, setFieldValue } = formik;

    const [getFieldFormikProps] = useFormikFiledProps(formik)

    useEffect(() => {
        const newSubsectoresFiltrados = filter(subsectores, row => row.sectorial === values.sectorial)
        setSubsectoresFiltrados(newSubsectoresFiltrados)
        setFieldValue('subsector', '')
    }, [values.sectorial])

    return (
        <Form formik={formik}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Select
                        {...getFieldFormikProps('sectorial')}
                        fullWidth
                        label="Sectorial"
                        variant="outlined"
                    >
                        {sectoriales.map((sectorial, key) =>
                            <MenuItem key={`${idSectoriales}-${key}`} value={sectorial.id}>{
                                sectorial.nombre}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>
                {subsectoresFiltrados.length > 0 ?
                    <Grid item xs={12}>
                        <Select
                            fullWidth
                            label="Subsector"
                            variant="outlined"
                            {...getFieldFormikProps('subsector')}
                        >
                            {subsectoresFiltrados.map((subsector, key) =>
                                <MenuItem key={`${idSubsectores}-${key}`} value={subsector.id}>
                                    {subsector.nombre}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    : null
                }
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('tipo')} fullWidth label="Tipo de equipo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('referencia')} fullWidth label="Referencia" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={3}>
                    <TextField {...getFieldFormikProps('direccionIP')} fullWidth label="Dirección IP" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField {...getFieldFormikProps('sistemaOperativo')} fullWidth label="Sistema operativo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('tipoProcesador')} fullWidth label="Tipo Procesador" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField {...getFieldFormikProps('discoDuro')} fullWidth label="Disco Duro" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                type='number'
                                {...getFieldFormikProps('capacidad')}
                                label="Capacidad del Disco Duro"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                fullWidth
                                name="capacidadDisco"
                                label="unidad"
                                variant="outlined"
                                value={_unidades.capacidadDisco}
                                onChange={(event) => {
                                    handlerChangeUnidades(event)
                                }}
                            >
                                {unidades.map((unidad, key) =>
                                    <MenuItem key={`${idUnidades}-${key}`} value={unidad}>
                                        {unidad}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                type='number'
                                {...getFieldFormikProps('memoria')}
                                label="Memoria RAM"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                fullWidth
                                name="memoriaRAM"
                                label="unidad"
                                variant="outlined"
                                value={_unidades.memoriaRAM}
                                onChange={(event) => {
                                    handlerChangeUnidades(event)
                                }}
                            >
                                {unidades.map((unidad, key) =>
                                    <MenuItem key={`${idUnidades}-${key}`} value={unidad}>
                                        {unidad}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                type='number'
                                {...getFieldFormikProps('espacioUsado')}
                                label="Espacio Usado del Disco Duro"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                fullWidth
                                name="espacionUsado"
                                label="unidad"
                                variant="outlined"
                                value={_unidades.espacionUsado}
                                onChange={(event) => {
                                    handlerChangeUnidades(event)
                                }}
                            >
                                {unidades.map((unidad, key) =>
                                    <MenuItem key={`${idUnidades}-${key}`} value={unidad}>
                                        {unidad}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom color='primary'>
                        Procure que los software instalados esten separados por comas.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...getFieldFormikProps('softwareInstalado')}
                        fullWidth
                        multiline
                        rows={4}
                        label="Software instalados"
                        variant="outlined" />
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

export default RegisterEquipment;