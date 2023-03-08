import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Card, Grid } from "@mui/material";

import { Accordion } from "components";
import { TableMaintenance, RegisterMaintenance } from './components';

export default function MaintenancePage() {
    const Accordions = [
        {
            title: 'Agregar mantenimiento',
            icon: <LibraryAddIcon color='primary' />,
            content: <RegisterMaintenance />
        }
    ]

    return (
        <Grid container spacing={3} paddingX={2}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Card>
                    <Accordion accordions={Accordions} indexOpen={0} />
                </Card>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Box>
                    <TableMaintenance />
                </Box>
            </Grid>
        </Grid>
    )
}