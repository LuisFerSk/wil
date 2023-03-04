import { useContext } from 'react'
import { useFormik } from "formik";
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { printerScannerSchema } from "schemas";
import { PrinterScannerCreateRequest } from "services/models";
import { FormPrinterScanner } from "components";
import { useMessage } from "hooks";
import { printerScannerCreate } from "services/printer_scanner";
import { AuthContext } from 'provider/Auth';

export default function RegisterPrinterScannerPage() {
    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [message, setMessage] = useMessage()

    const formik = useFormik({
        initialValues: new PrinterScannerCreateRequest(),
        validationSchema: printerScannerSchema,
        onSubmit: (data, { resetForm }) => {
            printerScannerCreate(token, new PrinterScannerCreateRequest(data))
                .then((_) => {
                    resetForm()
                    setMessage("success", 'Se ha guardado correctamente la impresora o scanner.')
                })
                .catch((error) => {
                    const { response } = error;

                    if (response) {
                        setMessage('error', response.data)
                        return;
                    }

                    setMessage('error', "Ha sucedió un error al realizar la operación")
                })
        },
    })

    return (
        <Grid paddingX={2}>
            <Grid
                item
                container
                xs={12}
                justifyContent="space-between"
            >
                <Typography variant="h4" sx={{ mb: 4 }} >Registrar impresora o scanner</Typography>
                <Link to='/printer-scanner'>
                    <Button variant="outlined" endIcon={<AssignmentIcon />}>
                        Inventario
                    </Button>
                </Link>
            </Grid>
            <FormPrinterScanner formik={formik} message={message} />
        </Grid>
    )
}