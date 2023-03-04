import { Button, Card, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

import { AuthContext } from "provider/Auth";
import { PrinterScannerFindBloc, PrinterScannerFindBlocFailure, PrinterScannerFindBlocLoading, PrinterScannerFindBlocSuccess } from "bloc";
import { printerScannerFind } from "services/printer_scanner";
import { Loader } from "pages";
import { FLAT, TYPE_PRINTER_SCANNER } from "constants";
import { TryAgain } from "components";

export default function ViewPrinterScannerPage() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [bloc, setBloc] = useState<PrinterScannerFindBloc>(new PrinterScannerFindBlocLoading())

    const theme = useTheme();

    let { id } = useParams();

    function getPrinterScanner() {
        id && printerScannerFind(token, id)
            .then((response) => {
                setBloc(new PrinterScannerFindBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new PrinterScannerFindBlocFailure(error))
            })
    }

    useEffect(() => {
        getPrinterScanner()
    }, [])

    if (bloc instanceof PrinterScannerFindBlocLoading) {
        return <Loader />
    }

    if (bloc instanceof PrinterScannerFindBlocSuccess) {
        const data = bloc.state;

        return (
            <Grid container paddingX={2}>
                <Grid
                    item
                    xs={12}
                    container
                    textAlign="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h4" sx={{ mb: 5 }} >Información de la impresora o scanner</Typography>
                    <Link to={`/printer-scanner/update/${data.id}`}>
                        <Button variant='outlined' color="secondary" endIcon={<EditIcon />}>
                            Editar
                        </Button>
                    </Link>
                </Grid>
                <Grid container item component={Card}>
                    <Grid container item spacing={2} xs={12} md={6} padding={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Tipo de equipo
                            </Typography>
                            <Typography variant="body2" >
                                {TYPE_PRINTER_SCANNER[data.type as keyof typeof TYPE_PRINTER_SCANNER]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Marca
                            </Typography>
                            <Typography variant="body2" >
                                {data.brand.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Modelo
                            </Typography>
                            <Typography variant="body2" >
                                {data.model}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Serial
                            </Typography>
                            <Typography variant="body2" >
                                {data.serial}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Placa
                            </Typography>
                            <Typography variant="body2" >
                                {data.licensePlate || 'No registrado'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                IP
                            </Typography>
                            <Typography variant="body2" >
                                {data.ip || 'No registrado'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color={theme.palette.primary.main}>
                                Estado
                            </Typography>
                            <Typography variant="body2">
                                {data.state}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2} xs={12} md={6} padding={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Adquirido por
                            </Typography>
                            <Typography variant="body2">
                                {data.acquiredBy}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Propietario
                            </Typography>
                            <Typography variant="body2">
                                {data.owner || 'No registrado'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Fecha de compra
                            </Typography>
                            <Typography variant="body2">
                                {data.dateOfPurchaseOrRental?.split('T')[0]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Finalización de garantía
                            </Typography>
                            <Typography variant="body2">
                                {data.warrantyEndDate?.split('T')[0] || 'No registrado'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Sede
                            </Typography>
                            <Typography variant="body2" >
                                {data.campus}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Area
                            </Typography>
                            <Typography variant="body2" >
                                {data.area}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" >
                                Piso
                            </Typography>
                            <Typography variant="body2" >
                                {FLAT[data.area as keyof typeof FLAT]}
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al consultar la impresora o scanner.'
            onClick={() => { getPrinterScanner() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}