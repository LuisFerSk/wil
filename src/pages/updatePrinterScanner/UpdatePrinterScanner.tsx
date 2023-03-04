import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, Typography } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

import { AuthContext } from "provider/Auth";
import { Loader } from "pages";
import { PrinterScannerFindBloc, PrinterScannerFindBlocFailure, PrinterScannerFindBlocLoading, PrinterScannerFindBlocSuccess } from "bloc";
import { printerScannerFind } from "services/printer_scanner";
import { FormUpdatePrinterScanner } from "./components";
import { TryAgain } from "components";

export default function UpdatePrinterScannerPage() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [bloc, setBloc] = useState<PrinterScannerFindBloc>(new PrinterScannerFindBlocLoading())

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
        return (
            <Grid paddingX={2}>
                <Grid
                    item
                    container
                    xs={12}
                    justifyContent="space-between"
                >
                    <Typography variant="h4" sx={{ mb: 5 }} >Actualizar impresora o scanner</Typography>
                    <Link to='/printer-scanner'>
                        <Button variant="outlined" endIcon={<AssignmentIcon />}>
                            Inventario
                        </Button>
                    </Link>
                </Grid>
                <Card>
                    <FormUpdatePrinterScanner initData={bloc.state} />
                </Card>
            </Grid>
        )
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al traer la información de la impresora o scanner.'
            onClick={() => { getPrinterScanner() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}