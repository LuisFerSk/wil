import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { equipoDownloadExcel, equipoDownloadExcelBySectorial, equipoDownloadExcelBySubsector } from "api/equipo";
import { Form, Select } from "components";
import { useFormik } from "formik";
import { useFormikFiledProps, useMessage } from "hooks";
import { SubsectorInterface } from "interfaces";
import { filter } from "lodash";
import { authContext } from "provider/Auth";
import { useContext, useEffect, useId, useState } from "react";
import { descargaInitialValues, descargaSchema } from "./schema";

const filtros = [
    { id: 1, nombre: 'Todo' },
    { id: 2, nombre: 'Por sectorial' }
]

function DescargaEquipos() {
    const idFiltro = useId()
    const idSectoriales = useId();
    const idSubsectores = useId();

    const authsContext = useContext(authContext)
    const { token, sectoriales, subsectores } = authsContext;

    const [subsectoresFiltrados, setSubsectoresFiltrados] = useState<SubsectorInterface[] | []>([])

    const [mensaje, setMensaje, mensajeLoader, resetMensaje] = useMessage()

    function handlerChangeMensaje(status: number) {
        if (status === 404) {
            setMensaje('warning', 'No se han encontrado datos para generar un Excel.')
            return;
        }
        if (status !== 200) {
            setMensaje('error', 'No se ha podido genera el excel de equipos.')
            return;
        }
        setMensaje('success', 'Se ha generado el excel de funcionarios equipos.')
        return;
    }

    const formik = useFormik({
        initialValues: descargaInitialValues,
        validationSchema: descargaSchema,
        onSubmit: (data, { resetForm }) => {
            const { downloadBy, nameFile } = data;

            mensajeLoader()

            if (downloadBy === 1) {
                equipoDownloadExcel(token, nameFile).then(result => {
                    handlerChangeMensaje(result.status)
                })
                return;
            }

            if (data.subsector != "") {
                const dataForDownload = {
                    id: data.subsector,
                    token,
                    nameFile
                }
                equipoDownloadExcelBySubsector(dataForDownload).then(result => { handlerChangeMensaje(result.status) })
                return
            }

            if (data.sectorial != "") {
                const dataForDownload = {
                    id: data.sectorial,
                    token,
                    nameFile
                }
                equipoDownloadExcelBySectorial(dataForDownload).then(result => { handlerChangeMensaje(result.status) })
                return
            }
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
                <Grid item xs={6}>
                    <Select
                        fullWidth
                        label="Filtro"
                        {...getFieldFormikProps('downloadBy')}
                        variant="outlined"
                    >
                        {filtros.map((filtro, key) =>
                            <MenuItem key={`${idFiltro}-${key}`} value={filtro.id}>{
                                filtro.nombre}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Nombre del archivo"
                        {...getFieldFormikProps('nameFile')}
                        variant="outlined"
                    />
                </Grid>
                {values.downloadBy === 2 ?
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
                    </Grid> : null
                }
                {values.downloadBy === 2 && subsectoresFiltrados.length > 0 ?
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
                    <Button type="submit" variant="contained">Descargar</Button>
                </Grid>
                <Grid item xs={12} alignContent="center" textAlign="center">
                    {mensaje}
                </Grid>
            </Grid>
        </Form>
    )
}

export default DescargaEquipos;