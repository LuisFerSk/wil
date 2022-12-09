import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Form from "components/form";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { equipmentSchema } from "./schema";
import { equipoUpdate } from "api/equipo";
import { updateDataInArray } from "utils";
import { EquipoInterface, SubsectorInterface, UpdateInterface } from "interfaces";
import { useContext, useEffect, useId, useState } from "react";
import { authContext } from "provider/Auth";
import { filter } from "lodash";
import { Select } from "components";
import { unidades } from "constants/unidades";


function UpdateEquipo(props: UpdateInterface<EquipoInterface>): JSX.Element {
    const { initData, setData } = props;

    const authsContext = useContext(authContext)
    const { token, sectoriales, subsectores } = authsContext;

    const idSectoriales = useId();
    const idUnidades = useId();

    const [subsectoresFiltrados, setSubsectoresFiltrados] = useState<SubsectorInterface[] | []>([])

    const [mensaje, setMensaje, mensajeLoader, resetMensaje] = useMessage()

    const regexUnidades = /(GB|TB|MB)/g

    const [_unidades, setUnidades] = useState({
        memoriaRAM: initData.memoria.slice(-2),
        capacidadDisco: initData.capacidad.slice(-2),
        espacionUsado: initData.espacioUsado.slice(-2),
    })

    function handlerChangeUnidades(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUnidades({
            ..._unidades,
            [event.target.name]: event.target.value
        })
    }

    const formik = useFormik({
        initialValues: {
            ...initData,
            memoria: initData.memoria.replace(regexUnidades, ''),
            capacidad: initData.capacidad.replace(regexUnidades, ''),
            espacioUsado: initData.espacioUsado.replace(regexUnidades, ''),
            direccionIP: initData.direccionIP === null ? '' : initData.direccionIP,
            sectorial: initData.id_sectorial,
            subsector: initData.id_subsector === null ? '' : initData.id_subsector
        },
        validationSchema: equipmentSchema,
        onSubmit: (data) => {
            mensajeLoader()

            const { id, id_sectorial, id_subsector, capacidad, memoria, espacioUsado } = data;

            const dataNormalizado = {
                ...data,
                capacidad: `${capacidad}${_unidades.capacidadDisco}`,
                memoria: `${memoria}${_unidades.memoriaRAM}`,
                espacioUsado: `${espacioUsado}${_unidades.espacionUsado}`,
            }

            equipoUpdate(dataNormalizado, token)
                .then((response) => {
                    if (response.status === 200) {
                        setData((old) => updateDataInArray<EquipoInterface>(old, id, response.data.data))
                        setMensaje("success", 'Se ha actualizado correctamente el equipo.')
                    }
                })
                .catch(({ response }) => {
                    setMensaje('error', response.data.message)
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
                                <MenuItem key={`${idSectoriales}-${key}`} value={subsector.id}>
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
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                {...getFieldFormikProps('memoria')}
                                label="Memoria RAM"
                                variant="outlined"
                            />
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

export default UpdateEquipo;