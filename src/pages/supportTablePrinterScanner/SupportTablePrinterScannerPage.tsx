import { useContext, useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { AuthContext } from 'provider/Auth';
import { PrinterScannerFindAllBloc, PrinterScannerFindAllBlocFailure, PrinterScannerFindAllBlocLoading, PrinterScannerFindAllBlocSuccess } from 'bloc';
import { printerScannerFindAll } from 'services/printer_scanner';
import { Loader } from 'pages';
import { TableSupportPrinterScanner } from './components';
import { TryAgain } from 'components';

export default function SupportTablePrinterScannerPage() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [bloc, setBloc] = useState<PrinterScannerFindAllBloc>(new PrinterScannerFindAllBlocLoading())

    function get() {
        printerScannerFindAll(token)
            .then((response) => {
                setBloc(new PrinterScannerFindAllBlocSuccess(response.data))
            })
            .catch((error) => {
                setBloc(new PrinterScannerFindAllBlocFailure(error))
            })
    }

    useEffect(() => {
        get()
    }, [])

    if (bloc instanceof PrinterScannerFindAllBlocSuccess) {
        return (
            <Grid container spacing={3} paddingX={2}>
                <Grid
                    item
                    xs={12}
                    container
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant='h3' >Impresoras y scanners</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <TableSupportPrinterScanner bloc={bloc} />
                    </Box>
                </Grid>
            </Grid>
        )
    }

    if (bloc instanceof PrinterScannerFindAllBlocLoading) {
        return <Loader height='100%' />
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al consultar las impresoras y scanner.'
            onClick={() => { get() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}
