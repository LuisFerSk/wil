import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";
import { useContext } from 'react';

import { Accordion } from "components";
import { BrandInterface, PrinterScannerInterface } from 'interfaces';
import { authContext } from 'provider/Auth';
import { brandFindAllByPrinterScanner } from 'services/brand';
import { roles } from 'constants';
import { printerScannerFindAll } from 'services/printer_scanner';
import { useGetQueryApi } from 'hooks';

import { AdminTablePrinterScanner, RegisterPrinterScanner, SupportTablePrinterScanner } from './components';

export default function PrinterScanner() {
    const _authContext = useContext(authContext)
    const { token, user } = _authContext;

    const [equipments, setEquipments] = useGetQueryApi<PrinterScannerInterface[]>(printerScannerFindAll(token), [])

    const [brands, setBrands] = useGetQueryApi<BrandInterface[]>(brandFindAllByPrinterScanner(token), [])

    const Accordions = [
        {
            title: 'Agregar impresora o scanner',
            icon: <LibraryAddIcon color='primary' />,
            content: <RegisterPrinterScanner setData={setEquipments} brands={brands} setBrands={setBrands} />
        }
    ]

    return (
        <Grid container spacing={6} paddingX={2}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Card>
                    <Accordion accordions={Accordions} indexOpen={0} />
                </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Box>
                    {user?.role === roles.administrator ? (
                        <AdminTablePrinterScanner
                            data={equipments}
                            setData={setEquipments}
                            updateProps={{
                                brands,
                                setBrands,
                            }}
                        />
                    ) : (
                        <SupportTablePrinterScanner data={equipments} />
                    )}
                </Box>
            </Grid>
        </Grid>
    )
}