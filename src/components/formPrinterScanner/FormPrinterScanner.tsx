import { useId, useEffect, useState, useContext } from 'react'
import { Card, Grid, MenuItem, TextField, Typography, Button } from "@mui/material";
import { FormikContextType } from "formik";
import { useTheme } from "@mui/material/styles";

import { AutocompleteBrand, Form, Select } from "components";
import { StateMessage } from "interfaces";
import { PrinterScannerCreateRequest } from "services/models";
import { useFormikFiledProps } from "hooks";
import { FLAT, TYPES_PRINTER_SCANNER_SELECT, ACQUIRED_BY_TYPES, AREAS, HEADQUARTERS, STATE, WARRANTY_END_DATE_DISABLE, TYPES_OF_ACQUISITION, OWNER_DISABLE } from 'constants';
import { brandFindAllByPrinterScanner } from 'services/brand';
import { BrandFindAllBloc, BrandFindAllBlocFailure, BrandFindAllBlocLoading, BrandFindAllBlocSuccess } from 'bloc';
import { AuthContext } from 'provider/Auth';

interface Props {
    formik: FormikContextType<PrinterScannerCreateRequest>
    message: StateMessage
}

export default function FormPrinterScanner(props: Props) {
    const { formik, message } = props;

    const theme = useTheme();

    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [brandBloc, setBrandBloc] = useState<BrandFindAllBloc>(new BrandFindAllBlocLoading())

    const [getFieldFormikProps] = useFormikFiledProps(formik)

    useEffect(() => {
        brandFindAllByPrinterScanner(token)
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
                            {TYPES_PRINTER_SCANNER_SELECT.map((printerScanner, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={printerScanner.value}>
                                    {printerScanner.label}
                                </MenuItem>
                            )}
                        </Select>
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
                            label="Modelo"
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
                    <Grid item xs={12} sm={3}>
                        <TextField
                            {...getFieldFormikProps('licensePlate')}
                            type='number'
                            fullWidth
                            label="Placa"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Select
                            fullWidth
                            label="Adquirido por"
                            variant="outlined"
                            {...getFieldFormikProps('acquiredBy')}
                            onChange={(event) => {
                                const { value, name } = event.target;

                                formik.setFieldValue(name, value)

                                if (value === ACQUIRED_BY_TYPES.compra) {
                                    formik.setFieldValue('owner', '')
                                }

                                if (value === ACQUIRED_BY_TYPES.renta) {
                                    formik.setFieldValue('warrantyEndDate', '')
                                }
                            }}
                        >
                            {TYPES_OF_ACQUISITION.map((item, key) =>
                                <MenuItem key={`${useId()}-${key}`} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            {...getFieldFormikProps('dateOfPurchaseOrRental')}
                            type='date'
                            fullWidth
                            label="Fecha de compra o renta"
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
                            disabled={WARRANTY_END_DATE_DISABLE[formik.values.acquiredBy as keyof typeof WARRANTY_END_DATE_DISABLE]}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...getFieldFormikProps('owner')}
                            fullWidth
                            label="Propietario"
                            variant="outlined"
                            disabled={OWNER_DISABLE[formik.values.acquiredBy as keyof typeof OWNER_DISABLE]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...getFieldFormikProps('ip')}
                            fullWidth
                            label="Dirección IP"
                            variant="outlined"
                        />
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
                        <Typography variant="subtitle2" color={theme.palette.primary.main}>
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