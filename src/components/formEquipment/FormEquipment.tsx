import { Button, Card, Grid, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import { FormikContextType } from "formik";
import { useContext, useEffect, useId, useState } from "react";
import { useTheme } from "@mui/material/styles";

import { AutocompleteBrand, Form, Select } from "components";
import { BrandFindAllBloc, BrandFindAllBlocFailure, BrandFindAllBlocLoading, BrandFindAllBlocSuccess } from "bloc";
import { brandFindAllByEquipment } from "services/brand";
import { AuthContext } from "provider/Auth";
import { useFormikFiledProps } from "hooks";
import { PROCESSOR_TYPES, RAM_MEMORY_TYPES, AREAS, FLAT, HARD_DRIVE_TYPES, HEADQUARTERS, NO_MONITOR, STATE, TYPES_EQUIPMENTS_SELECT } from "constants";
import { StateMessage } from "interfaces";
import { EquipmentCreateRequest } from "services/models";

interface Props {
    formik: FormikContextType<EquipmentCreateRequest>
    message: StateMessage
}

export default function FormEquipment(props: Props) {
    const { formik, message } = props;

    const theme = useTheme();

    const _authContext = useContext(AuthContext)
    const { token } = _authContext;

    const [brandBloc, setBrandBloc] = useState<BrandFindAllBloc>(new BrandFindAllBlocLoading())

    const [getFieldFormikProps] = useFormikFiledProps(formik)

    useEffect(() => {
        brandFindAllByEquipment(token)
            .then((response) => {
                setBrandBloc(new BrandFindAllBlocSuccess(response.data))
            }).catch((error) => {
                setBrandBloc(new BrandFindAllBlocFailure(error))
            })
    }, [])

    return (
        <Form formik={formik}>
            <Card>
                <Grid container spacing={3} padding={3}>
                    <Grid item xs={12} sm={6}>
                        <Select
                            fullWidth
                            label="Tipo"
                            variant="outlined"
                            {...getFieldFormikProps('type')}
                        >
                            {TYPES_EQUIPMENTS_SELECT.map((typeEquipment, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={typeEquipment.value}>
                                    {typeEquipment.label}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            {...getFieldFormikProps('dateOfPurchase')}
                            type='date'
                            fullWidth
                            label="Fecha de compra"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            {...getFieldFormikProps('warrantyEndDate')}
                            type='date'
                            fullWidth
                            label="Fecha de finalización de garantía"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AutocompleteBrand
                            fieldValue={formik.values.brand}
                            setFieldValue={formik.setFieldValue}
                            brandBloc={brandBloc}
                            textFieldProps={{
                                fullWidth: true,
                                label: 'Marca',
                                variant: "outlined",
                                ...getFieldFormikProps('brand')
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...getFieldFormikProps('model')}
                            fullWidth
                            label="Modelo del equipo"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            {...getFieldFormikProps('licensePlate')}
                            value={formik.values.licensePlate || ''}
                            type='number'
                            fullWidth
                            label="Placa"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Select
                            fullWidth
                            variant="outlined"
                            label="Tipo de procesador"
                            {...getFieldFormikProps('processorType')}
                        >
                            {PROCESSOR_TYPES.map((item, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...getFieldFormikProps('processorModel')}
                            fullWidth
                            label="Modelo del procesador"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...getFieldFormikProps('serial')}
                            fullWidth
                            label="Serial"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...getFieldFormikProps('monitorSerial')}
                            value={formik.values.monitorSerial || ''}
                            fullWidth
                            label="Serial del monitor"
                            variant="outlined"
                            disabled={NO_MONITOR[formik.values.type as keyof typeof NO_MONITOR]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            {...getFieldFormikProps('monitorLicensePlate')}
                            value={formik.values.monitorLicensePlate || ''}
                            type='number'
                            fullWidth
                            label="Placa del monitor"
                            variant="outlined"
                            disabled={NO_MONITOR[formik.values.type as keyof typeof NO_MONITOR]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            {...getFieldFormikProps('monitorModel')}
                            fullWidth
                            label="Modelo monitor"
                            variant="outlined"
                            disabled={NO_MONITOR[formik.values.type as keyof typeof NO_MONITOR]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            {...getFieldFormikProps('hardDriveCapacity_1')}
                            type='number'
                            fullWidth
                            label="Capacidad del disco duro 1"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >GB</InputAdornment>
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Select
                            fullWidth
                            variant="outlined"
                            label="Tipo de disco duro 1"
                            {...getFieldFormikProps('hardDriveType_1')}
                        >
                            {HARD_DRIVE_TYPES.map((item, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            {...getFieldFormikProps('hardDriveCapacity_2')}
                            value={formik.values.hardDriveCapacity_2 || ''}
                            type='number'
                            fullWidth
                            label="Capacidad del disco duro 2"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >GB</InputAdornment>
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Select
                            fullWidth
                            variant="outlined"
                            label="Tipo de disco duro 2"
                            {...getFieldFormikProps('hardDriveType_2')}
                            value={formik.values.hardDriveType_2 || ''}
                        >
                            {HARD_DRIVE_TYPES.map((item, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            {...getFieldFormikProps('ramMemoryCapacity')}
                            type='number'
                            fullWidth
                            label="Cantidad de memoria RAM"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >GB</InputAdornment>
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Select
                            fullWidth
                            variant="outlined"
                            label="Tipo de memoria RAM"
                            {...getFieldFormikProps('ramMemoryType')}
                        >
                            {RAM_MEMORY_TYPES.map((item, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Select
                            fullWidth
                            variant="outlined"
                            label="Estado"
                            {...getFieldFormikProps('state')}
                        >
                            {STATE.map((item, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color={theme.palette.primary.main} >
                            Ubicación
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Select
                            fullWidth
                            label="Sede"
                            variant="outlined"
                            {...getFieldFormikProps('campus')}
                        >
                            {HEADQUARTERS.map((campus, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={campus.value}>
                                    {campus.label}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Select
                            fullWidth
                            label="Area"
                            variant="outlined"
                            {...getFieldFormikProps('area')}
                        >
                            {AREAS.map((area, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={area.value}>
                                    {area.label}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            value={FLAT[formik.values.area as keyof typeof FLAT] || ''}
                            fullWidth
                            label="Piso"
                            type="number"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: Boolean(formik.values.area),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color={theme.palette.primary.main} >
                            Información del usuario
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField {...getFieldFormikProps('user')} fullWidth label="Nombre" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField {...getFieldFormikProps('cc')} fullWidth type="number" label="Cédula" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...getFieldFormikProps('phone')}
                            value={formik.values.phone || ''}
                            fullWidth
                            type="number"
                            label="Teléfono"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">Guardar</Button>
                    </Grid>
                    <Grid item xs={12} textAlign='center'>
                        {message}
                    </Grid>
                </Grid>
            </Card>
        </Form >
    )
}