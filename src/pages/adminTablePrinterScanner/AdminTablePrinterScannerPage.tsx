import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { PrinterScannerFindAllBlocLoading, PrinterScannerFindAllBlocSuccess } from "bloc";
import { AdminTablePrinterScannerContext } from "./context";
import { Loader } from "pages";
import { TablePrinterScanner } from "./components";
import { TryAgain } from "components";

export default function AdminTablePrinterScannerPage() {
    const adminTablePrinterScannerContext = useContext(AdminTablePrinterScannerContext)
    const { bloc, getPrinterScanner } = adminTablePrinterScannerContext;

    if (bloc instanceof PrinterScannerFindAllBlocSuccess) {
        return (
            <Grid container spacing={3} paddingX={2}>
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="space-between"
                >
                    <Typography variant='h4' sx={{ mb: 1 }}>Impresoras y scanners</Typography>
                    <Link to='/printer-scanner/register'>
                        <Button variant='outlined' color='secondary' endIcon={<AddIcon />}>
                            Agregar
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <TablePrinterScanner bloc={bloc} />
                    </Box>
                </Grid>
            </Grid>
        )
    }

    if (bloc instanceof PrinterScannerFindAllBlocLoading) {
        return <Loader />
    }

    return (
        <TryAgain
            message='Ha ocurrido un error al consultar las impresoras y scanner.'
            onClick={() => { getPrinterScanner && getPrinterScanner() }}
        >
            volver a intentarlo
        </TryAgain >
    )
}
